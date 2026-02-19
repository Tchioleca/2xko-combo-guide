import React from "react";
import { Link } from "react-router-dom";
import { DifficultyBox, MeterBox } from "./ComboUI";

/*
  Reusable list component:
  - Displays name
  - Character
  - Difficulty (colored boxes)
  - Meter (colored boxes)
  - Likes ///
*/
export default function ComboList({ title = "Most liked combos:", combos = [] }) {
  return (
    <section className="combo-section">
      <h3 className="combo-section-title">{title}</h3>

      {combos.length ? (
        <ul className="combo-cards">
          {combos.map((combo) => (
            <li key={combo.id} className="combo-card">

              {/* Top row */}
              <div className="combo-card-row">
                <Link
                  className="combo-card-name"
                  to={`/characters/${combo.characterId}/combos/${combo.id}`}
                >
                  {combo.name}
                </Link>

                <div className="combo-card-likes">
                  👍 {combo.likes ?? 0}
                </div>
              </div>

              {/* Meta row */}
              <div className="combo-card-meta">

                <span>
                  <strong>Character:</strong> {combo.characterName || "—"}
                </span>

                {/* Difficulty */}
                <span style={{ display: "flex", alignItems: "center" }}>
                  <strong style={{ marginRight: 6 }}>Difficulty:</strong>
                  {combo.difficulty ? (
                    combo.difficulty
                      .split(",")
                      .map((level, index) => (
                        <DifficultyBox
                          key={index}
                          level={level.trim()}
                        />
                      ))
                  ) : (
                    "—"
                  )}
                </span>

                {/* Meter */}
                <span style={{ display: "flex", alignItems: "center" }}>
                  <strong style={{ marginRight: 6 }}>Meter:</strong>
                  {combo.meter ? (
                    combo.meter
                      .split(",")
                      .map((level, index) => (
                        <MeterBox
                          key={index}
                          level={level.trim()}
                        />
                      ))
                  ) : (
                    "—"
                  )}
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
