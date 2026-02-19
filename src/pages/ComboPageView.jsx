import React from "react";
import { Link } from "react-router-dom";
import { InputPill, DifficultyBox, MeterBox } from "../components/ComboUI";
import "./ComboPage.css";

/*
  VIEW ONLY:
  - Receives ready-to-render props
  - No axios
  - No state
  - No setState/useEffect
*/
export default function ComboPageView({ loading, error, combo, character, backLink }) {
  if (loading) return <div className="page">Loading combo…</div>;
  if (error) return <div className="page">Error: {error}</div>;
  if (!combo) return <div className="page">Not found</div>;

  const inputs = combo.inputs || [];
  const buttonImages = combo.buttonImages || [];
  const imgSrc = character?.image || null;

  return (
    <div className="page">
      <Link to={backLink} className="back">← Back</Link>

      {imgSrc && (
        <div className="combo-image">
          <img src={imgSrc} alt={character?.name} style={{ maxHeight: 120 }} />
        </div>
      )}

      <div className="combo-header">
        <h1>{combo.name}</h1>
      </div>

      <div className="combo-inputs">
        <h4>Input sequence</h4>

        <div className="input-row">
          {inputs.length ? (
            inputs.map((input, index) => (
              <InputPill
                key={index}
                label={input}
                image={buttonImages[index]}
                description={input}
              />
            ))
          ) : (
            <div>No input sequence</div>
          )}
        </div>
      </div>

      <div className="combo-details">
        <div><strong>Character:</strong> {character?.name || "—"}</div>

        <div className="difficulty-row">
          <strong>Difficulty:</strong>
          <div>
            {combo.difficulty ? (
              combo.difficulty.split(",").map((item, index) => (
                <DifficultyBox key={index} level={item.trim()} />
              ))
            ) : (
              <span>—</span>
            )}
          </div>
        </div>

        <div className="meter-row">
          <strong>Meter:</strong>
          <div>
            {combo.meter ? (
              combo.meter.split(",").map((item, index) => (
                <MeterBox key={index} level={item.trim()} />
              ))
            ) : (
              <span>—</span>
            )}
          </div>
        </div>

        <div><strong>Description:</strong> {combo.description}</div>
        <div><strong>Combo likes:</strong> {combo.likes ?? 0}</div>
      </div>
    </div>
  );
}
