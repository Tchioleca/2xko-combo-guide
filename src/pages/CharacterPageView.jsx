import React from "react";
import { Link } from "react-router-dom";
import "./CharacterPage.css";
const dariusBg =
  "https://res.cloudinary.com/dywiabwjp/image/upload/v1771543691/darius_ccooij.png";
/*
  VIEW ONLY:
  - Receives props
  - No axios
  - No state
*/
export default function CharacterPageView({
  loading,
  error,
  character,
  combos,
  backLink,
  characterId
}) {
  if (loading) return <div className="page">Loading character…</div>;
  if (error) return <div className="page">Error: {error}</div>;
  if (!character) return <div className="page">Not found</div>;

  const imgSrc = character.image || null;

  return (
    <div className="page" 
    
     style={
    character?.id === "1"
      ? {
          backgroundImage: `url(${dariusBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }
      : {}
  }>
      <Link to={backLink} className="back">← Back</Link>

      <h1>{character.name}</h1>

      <div className="container">
        <div className="left">
          <div className="avatar-large">
            {imgSrc ? (
              <img src={imgSrc} alt={character.name} style={{ maxHeight: 150 }} />
            ) : (
              <div style={{ fontSize: 48 }}>{character.name?.[0]}</div>
            )}
          </div>
        </div>

        <div>
          <p><strong>Region:</strong> {character.region}</p>
          <p><strong>Archetype:</strong> {character.archetype}</p>
          <p><strong>Difficulty:</strong> {character.difficulty}</p>
          <p><strong>Likes:</strong> {character.likes}</p>
          <p><strong>Dislikes:</strong> {character.dislikes}</p>

          <h3>Combos</h3>

          {combos && combos.length ? (
            <ul className="combo-list">
              {combos.map((combo) => (
                <li key={combo.id}>
                  <Link to={`/characters/${characterId}/combos/${combo.id}`}>
                    {combo.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>No combos listed for this character.</div>
          )}
        </div>
      </div>
    </div>
  );
}
