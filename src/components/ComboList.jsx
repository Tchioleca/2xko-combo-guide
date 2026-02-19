import React from "react";
import { Link } from "react-router-dom";
import { DifficultyBox, MeterBox } from "./ComboUI";

export default function ComboList({
  title = "Most liked combos:",
  combos = [],
  onLike,
}) {
  return (
    <section className="combo-section">
      <h3 className="combo-section-title">{title}</h3>

      {combos.length ? (
        <ul className="combo-cards">
          {combos.map((combo) => (
            <li key={combo.id} className="combo-card">
              <div className="combo-card-row">
                <Link
                  className="combo-card-name"
                  to={`/characters/${combo.characterId}/combos/${combo.id}`}
                >
                  {combo.name}
                </Link>

                <div className="combo-card-likes">
                  {combo.comboLikes ?? 0}
                  <button
                    className="like-button"
                    onClick={() => onLike?.(combo)}
                    style={{ marginLeft: 8, cursor: "pointer" }}
                  >
                    👍
                  </button>
                </div>
              </div>

              <div className="combo-card-meta">
                <span>
                  <strong>Character:</strong> {combo.characterName || "—"}
                </span>

                <span style={{ display: "flex", alignItems: "center" }}>
                  <strong style={{ marginRight: 6 }}>Difficulty:</strong>
                  {combo.difficulty
                    ? combo.difficulty
                        .split(",")
                        .map((lvl, i) => (
                          <DifficultyBox key={i} level={lvl.trim()} />
                        ))
                    : "—"}
                </span>

                <span style={{ display: "flex", alignItems: "center" }}>
                  <strong style={{ marginRight: 6 }}>Meter:</strong>
                  {combo.meter
                    ? combo.meter
                        .split(",")
                        .map((lvl, i) => (
                          <MeterBox key={i} level={lvl.trim()} />
                        ))
                    : "—"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No combos found</div>
      )}
    </section>
  );
}
