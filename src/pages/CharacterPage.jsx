// src/pages/CharacterPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CharacterPageView from "./CharacterPageView";

export default function CharacterPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [character, setCharacter] = useState(null);
  const [combos, setCombos] = useState([]);

  const baseUrl = import.meta.env.VITE_SERVER_URL || "";

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

        const characterRes = await axios.get(`${baseUrl}/characters/${id}`);
        const characterData = characterRes.data || null;

        const normalizedCharacter = characterData
          ? { ...characterData, image: getCharacterImage(characterData) }
          : null;

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

    if (id) load();

    return () => {
      alive = false;
    };
  }, [id, baseUrl]);

  async function handleCreateNewCombo() {
    try {
      const payload = {
        name: "Edit Comboname",
        difficulty: "easy",
        inputButtons: [],
        characterId: String(id),
        description: "Add description",
        comboLikes: 0,
        meterCost: 0
      };

      const res = await fetch(`${baseUrl}/combos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to create combo");

      const created = await res.json();

      navigate(`/characters/${id}/combos/${created.id}`);
    } catch (err) {
      console.error(err);
      setError("Could not create combo.");
    }
  }

  const backLink = useMemo(() => "/", []);

  return (
    <CharacterPageView
      loading={loading}
      error={error}
      character={character}
      combos={combos}
      backLink={backLink}
      onCreateNewCombo={handleCreateNewCombo}
    />
  );
}