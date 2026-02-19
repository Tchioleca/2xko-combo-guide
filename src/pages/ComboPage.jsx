import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ComboPageView from "./ComboPageView";

/*
  CONTAINER:
  - Reads URL params
  - Calls API
  - Stores state (loading/error/data)
  - Prepares "view-ready" props for ComboPageView
*/

export default function ComboPage() {
  // Supports routes like:
  // /combos/:comboId
  // /characters/:characterId/combos/:comboId
  const { comboId, characterId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [combo, setCombo] = useState(null);
  const [character, setCharacter] = useState(null);

  const baseUrl = import.meta.env.VITE_SERVER_URL || "";

  // Helper kept INSIDE this file (no utils folder)
  function getCharacterImage(characterObj) {
    if (!characterObj) return null;
    if (characterObj.name === "Darius") {
      return "https://res.cloudinary.com/dywiabwjp/image/upload/v1771488012/Darius_xmveud.png";
    }
    return characterObj.avatar || characterObj.imageUrl || null;
  }

  // Helper kept INSIDE this file (no utils folder)
  function getComboInputs(comboObj) {
    return (
      comboObj?.inputButtons ||
      comboObj?.inputSequence ||
      comboObj?.inputs ||
      comboObj?.sequence ||
      comboObj?.commands ||
      []
    );
  }

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        setCombo(null);
        setCharacter(null);

        if (!comboId) {
          throw new Error("Combo not found.");
        }

        // 1) GET combo
        const comboRes = await axios.get(`${baseUrl}/combos/${comboId}`);
        const comboData = comboRes.data || null;

        // Normalize inputs ONCE (so the view stays simple)
        const normalizedCombo = comboData
          ? { ...comboData, inputs: getComboInputs(comboData) }
          : null;

        // 2) Pick character id: route param first, else combo.characterId
        const pickedCharacterId = characterId || comboData?.characterId;

        // 3) GET character if possible
        let characterData = comboData?.character || null;
        if (pickedCharacterId) {
          const charRes = await axios.get(`${baseUrl}/characters/${pickedCharacterId}`);
          characterData = charRes.data || null;
        }

        // Normalize image ONCE
        const normalizedCharacter = characterData
          ? { ...characterData, image: getCharacterImage(characterData) }
          : null;

        if (!alive) return;

        setCombo(normalizedCombo);
        setCharacter(normalizedCharacter);
        setLoading(false);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Could not load combo.");
        setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [comboId, characterId, baseUrl]);

  // Build Back link (simple version)
  const backLink = useMemo(() => {
    const id = characterId || combo?.characterId || character?.id;
    return id ? `/characters/${id}` : "/";
  }, [characterId, combo?.characterId, character?.id]);

  return (
    <ComboPageView
      loading={loading}
      error={error}
      combo={combo}
      character={character}
      backLink={backLink}
    />
  );
}
