import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CharacterPageView from "./CharacterPageView";

/*
  CONTAINER:
  - Reads URL params (characterId)
  - Calls API
  - Stores state
  - Prepares "view-ready" props (character.image)
*/
export default function CharacterPage() {
  const { id } = useParams(); // route should be: /characters/:id

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [character, setCharacter] = useState(null);
  const [combos, setCombos] = useState([]);

  const baseUrl = import.meta.env.VITE_SERVER_URL || "";

  // Keep helper inside this file (no utils folder)
  function getCharacterImage(characterObj) {
    if (!characterObj) return null;
    if (characterObj.name === "Darius") {
      return "https://res.cloudinary.com/dywiabwjp/image/upload/v1771488012/Darius_xmveud.png";
    }
    return characterObj.avatar || characterObj.imageUrl || null;
  }

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        setCharacter(null);
        setCombos([]);

        if (!id) throw new Error("Character not found.");

        // 1) GET character
        const characterRes = await axios.get(`${baseUrl}/characters/${id}`);
        const characterData = characterRes.data || null;

        // Add image field for the view
        const normalizedCharacter = characterData
          ? { ...characterData, image: getCharacterImage(characterData) }
          : null;

        // 2) GET combos for character (1 -> many relation)
        const combosRes = await axios.get(`${baseUrl}/combos?characterId=${id}`);
        const comboList = Array.isArray(combosRes.data) ? combosRes.data : [];

        if (!alive) return;

        setCharacter(normalizedCharacter);
        setCombos(comboList);
        setLoading(false);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Could not load character.");
        setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [id, baseUrl]);

  const backLink = useMemo(() => "/", []);

  return (
    <CharacterPageView
      loading={loading}
      error={error}
      character={character}
      combos={combos}
      backLink={backLink}
      characterId={id}
    />
  );
}
