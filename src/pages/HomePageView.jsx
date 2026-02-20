import React from "react";
import { Link } from "react-router-dom";
import ComboList from "../components/ComboList.jsx";
import "./HomePage.css";

export default function HomePageView({ loading, error, characters, topCombos, onLike }) {
  if (loading) return <div className="loading">Loading…</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page">
      <h1 className="heading">CHAMPIONS</h1>

      <div className="grid">
        {characters && characters.length ? (
          characters.map((character) => {
            const portraitSrc =
              character.image || character.avatar || character.imageUrl || character.portrait || null;

            return (
              <Link key={character.id} to={`/characters/${character.id}`} className="card">
                <div className="avatar">
                  {portraitSrc ? (
                    <img
                      src={portraitSrc}
                      alt={character.name}
                      className="portrait"
                      loading="lazy"
                    />
                  ) : (
                    <div className="avatar-fallback">{character.name?.[0] || "C"}</div>
                  )}
                </div>

                <div className="name">{character.name}</div>
              </Link>
            );
          })
        ) : (
          <div>No characters found</div>
        )}
      </div>

      <ComboList title="Most liked combos:" combos={topCombos} onLike={onLike} />
    </div>
  );
}