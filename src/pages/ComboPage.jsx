// src/pages/ComboPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ComboPageView from "./ComboPageView";

export default function ComboPage() {
  const { comboId, characterId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [combo, setCombo] = useState(null);
  const [character, setCharacter] = useState(null);
  const [inputMap, setInputMap] = useState({});

  // Edit name
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState("");

  // Edit description
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [draftDesc, setDraftDesc] = useState("");

  const baseUrl = import.meta.env.VITE_SERVER_URL || "";

  function getCharacterImage(characterObj) {
    if (!characterObj) return null;
    if (characterObj.name === "Darius") {
      return "https://res.cloudinary.com/dywiabwjp/image/upload/v1771488012/Darius_xmveud.png";
    }
    return characterObj.avatar || characterObj.imageUrl || null;
  }

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

        // reset edit UI on navigation
        setIsEditingName(false);
        setDraftName("");
        setIsEditingDesc(false);
        setDraftDesc("");

        if (!comboId) throw new Error("Combo not found.");

        // 1) GET combo
        const comboRes = await axios.get(`${baseUrl}/combos/${comboId}`);
        const comboData = comboRes.data || null;

        // 2) GET inputs dictionary
        const inputsRes = await axios.get(`${baseUrl}/inputs`);
        const inputsList = Array.isArray(inputsRes.data) ? inputsRes.data : [];

        const builtInputMap = {};
        inputsList.forEach((item) => {
          const key = String(item.id || "").trim();
          if (!key) return;
          builtInputMap[key] = {
            image: item.image || null,
            description: item.description || key
          };
        });

        // normalize combo for view
        const normalizedCombo = comboData
          ? { ...comboData, inputs: getComboInputs(comboData) }
          : null;

        // init drafts
        setDraftName(normalizedCombo?.name || "");
        setDraftDesc(normalizedCombo?.description || "");

        //  GET character
        const pickedCharacterId = characterId || comboData?.characterId;

        let characterData = comboData?.character || null;
        if (pickedCharacterId) {
          const charRes = await axios.get(`${baseUrl}/characters/${pickedCharacterId}`);
          characterData = charRes.data || null;
        }

        const normalizedCharacter = characterData
          ? { ...characterData, image: getCharacterImage(characterData) }
          : null;

        if (!alive) return;

        setCombo(normalizedCombo);
        setCharacter(normalizedCharacter);
        setInputMap(builtInputMap);
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

  const backLink = useMemo(() => {
    const id = characterId || combo?.characterId || character?.id;
    return id ? `/characters/${id}` : "/";
  }, [characterId, combo?.characterId, character?.id]);

  // ---- Edit Name handlers ----
  function startEditName() {
    setDraftName(combo?.name || "");
    setIsEditingName(true);
  }

  function cancelEditName() {
    setDraftName(combo?.name || "");
    setIsEditingName(false);
  }

  async function saveEditName() {
    if (!combo) return;

    const nextName = (draftName || "").trim();
    if (!nextName) return;

    try {
      await axios.patch(`${baseUrl}/combos/${combo.id}`, { name: nextName });
      setCombo((prev) => (prev ? { ...prev, name: nextName } : prev));
      setIsEditingName(false);
    } catch (e) {
      setError(e?.message || "Could not update combo name.");
    }
  }

  // ---- Edit Description handlers ----
  function startEditDesc() {
    setDraftDesc(combo?.description || "");
    setIsEditingDesc(true);
  }

  function cancelEditDesc() {
    setDraftDesc(combo?.description || "");
    setIsEditingDesc(false);
  }

  async function saveEditDesc() {
    if (!combo) return;

    const nextDesc = (draftDesc ?? "").trim();

    try {
      await axios.patch(`${baseUrl}/combos/${combo.id}`, { description: nextDesc });
      setCombo((prev) => (prev ? { ...prev, description: nextDesc } : prev));
      setIsEditingDesc(false);
    } catch (e) {
      setError(e?.message || "Could not update description.");
    }
  }

  return (
    <ComboPageView
      loading={loading}
      error={error}
      combo={combo}
      character={character}
      backLink={backLink}
      inputMap={inputMap}
      // name edit
      isEditingName={isEditingName}
      draftName={draftName}
      setDraftName={setDraftName}
      onStartEditName={startEditName}
      onCancelEditName={cancelEditName}
      onSaveEditName={saveEditName}
      // description edit
      isEditingDesc={isEditingDesc}
      draftDesc={draftDesc}
      setDraftDesc={setDraftDesc}
      onStartEditDesc={startEditDesc}
      onCancelEditDesc={cancelEditDesc}
      onSaveEditDesc={saveEditDesc}
    />
  );
}