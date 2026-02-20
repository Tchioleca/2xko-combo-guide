// src/pages/CharacterPageView.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./CharacterPage.css";

const dariusBg =
  "https://res.cloudinary.com/dywiabwjp/image/upload/v1771543691/darius_ccooij.png";

const ahriBg =
  "https://res.cloudinary.com/dywiabwjp/image/upload/v1771556971/2xko-social-3840x2160-desktopwallpaper-ahri_istn3r.png";

export default function CharacterPageView({
  loading,
  error,
  character,
  combos,              // <-- IMPORTANT: use this
  backLink,
  onCreateNewCombo
}) {
  if (loading) return <div className="page">Loading character…</div>;
  if (error) return <div className="page">Error: {error}</div>;
  if (!character) return <div className="page">Not found</div>;

  const list = Array.isArray(combos) ? combos : []; // <-- IMPORTANT

  const bg =
    character?.id === "1" ? dariusBg : character?.id === "2" ? ahriBg : null;

  return (
    <div
      className="page"
      style={
        bg
          ? {
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }
          : {}
      }
    >
      <Link to={backLink} className="back">
        ← Back
      </Link>

      <div className="character-details">
        <h1 className="character-name">{character.name}</h1>

        <div className="row"><strong>REGION:</strong> {character.region || "—"}</div>
        <div className="row"><strong>ARCHETYPE:</strong> {character.archetype || "—"}</div>
        <div className="row"><strong>DIFFICULTY:</strong> {character.difficulty || "—"}</div>
        <div className="row"><strong>LIKES:</strong> {character.likes || "—"}</div>
        <div className="row"><strong>DISLIKES:</strong> {character.dislikes || "—"}</div>
      </div>

      <div className="combos-header">
        <h2 className="combos-title">COMBOS</h2>

        <button type="button" className="create-new" onClick={onCreateNewCombo}>
           CREATE NEW
        </button>
      </div>

      <div className="combo-list">
        {list.length === 0 ? (
          <div>NO COMBOS YET.</div>
        ) : (
          list.map((c) => (
            <Link
              key={c.id}
              to={`/characters/${character.id}/combos/${c.id}`}
              className="combo-item"
            >
              {c.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}