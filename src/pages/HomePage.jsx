// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import HomePageView from "./HomePageView";

export default function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [topCombos, setTopCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = import.meta.env.VITE_SERVER_URL || "";

  function getCharacterImage(character) {
    if (!character) return null;
    if (character.name === "Darius") {
      return "https://res.cloudinary.com/dywiabwjp/image/upload/v1771488012/Darius_xmveud.png";
    }
    return character.avatar || character.imageUrl || null;
  }

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        // 1) Fetch both lists
        const charsRes = await axios.get(`${baseUrl}/characters`);
        const combosRes = await axios.get(`${baseUrl}/combos`);

        const chars = Array.isArray(charsRes.data) ? charsRes.data : [];
        const combos = Array.isArray(combosRes.data) ? combosRes.data : [];

        // 2) Normalize characters (add image for the grid)
        const charsWithImages = chars.map((c) => ({
          ...c,
          image: getCharacterImage(c)
        }));

        // 3) Create a lookup map: characterId -> characterName
        const nameById = {};
        chars.forEach((c) => {
          nameById[String(c.id)] = c.name;
        });

        // 4) Normalize combos (add characterName) + sort by likes
        const combosWithNames = combos
          .map((combo) => ({
            ...combo,
            characterId: String(combo.characterId || ""),
            characterName: nameById[String(combo.characterId)] || "—",
            likes: combo.likes ?? 0
          }))
          .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));

        setCharacters(charsWithImages);
        setTopCombos(combosWithNames);
        setLoading(false);
      } catch (e) {
        setCharacters([]);
        setTopCombos([]);
        setError(e?.message || "Could not load home data.");
        setLoading(false);
      }
    }

    load();
  }, [baseUrl]);

  return (
    <HomePageView
      loading={loading}
      error={error}
      characters={characters}
      topCombos={topCombos}
    />
  );
}
