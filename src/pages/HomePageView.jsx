import React from "react";
import { Link } from "react-router-dom";
import ComboList from "../components/ComboList";
import "./HomePage.css";

export default function HomePageView({ loading, error, characters, topCombos }) {
  if (loading) return <div className="loading">Loading…</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page">
      <h1 className="heading">2xko — Characters</h1>

      <div className="grid">
        {characters && characters.length ? (
          characters.map((character) => (
            <Link key={character.id} to={`/characters/${character.id}`} className="card">
              <div className="avatar">
                {character.image ? (
                  <img src={character.image} alt={character.name} style={{ maxHeight: 64 }} />
                ) : (
                  <div>{character.name?.[0] || "C"}</div>
                )}
              </div>
              <div className="name">{character.name}</div>
            </Link>
          ))
        ) : (
          <div>No characters found</div>
        )}
      </div>

      {/* New section */}
      <ComboList title="Most liked combos:" combos={topCombos} />
    </div>
  );
}
