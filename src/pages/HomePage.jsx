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

  async function handleLike(combo) {
    try {
      const newcomboLikes = (combo.comboLikes ?? 0) + 1;

      await axios.patch(`${baseUrl}/combos/${combo.id}`, {
        comboLikes: newcomboLikes
      });

      setTopCombos((prev) =>
        prev
          .map((c) => (c.id === combo.id ? { ...c, comboLikes: newcomboLikes } : c))
          .sort((a, b) => (b.comboLikes ?? 0) - (a.comboLikes ?? 0))
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const charsRes = await axios.get(`${baseUrl}/characters`);
        const combosRes = await axios.get(`${baseUrl}/combos`);

        const chars = Array.isArray(charsRes.data) ? charsRes.data : [];
        const combos = Array.isArray(combosRes.data) ? combosRes.data : [];

        // IMPORTANT: do not overwrite image; use what's in db.json
        setCharacters(chars);

        const nameById = {};
        chars.forEach((c) => {
          nameById[String(c.id)] = c.name;
        });

        const combosWithNames = combos
          .map((combo) => ({
            ...combo,
            characterId: String(combo.characterId || ""),
            characterName: nameById[String(combo.characterId)] || "—",
            comboLikes: combo.comboLikes ?? 0
          }))
          .sort((a, b) => (b.comboLikes ?? 0) - (a.comboLikes ?? 0));

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
      onLike={handleLike}
    />
  );
}