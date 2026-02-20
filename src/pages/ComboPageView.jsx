// src/pages/ComboPageView.jsx
import React from "react";
import { Link } from "react-router-dom";
import { InputPill, DifficultyBox, MeterBox } from "../components/ComboUI";
import InputSequenceEditor from "../components/InputSequenceEditor";
import "./ComboPage.css";

const dariusBg =
  "https://res.cloudinary.com/dywiabwjp/image/upload/v1771543691/darius_ccooij.png";

const ahriBg =
  "https://res.cloudinary.com/dywiabwjp/image/upload/v1771556971/2xko-social-3840x2160-desktopwallpaper-ahri_istn3r.png";

export default function ComboPageView({
  loading,
  error,
  combo,
  character,
  backLink,
  inputMap,
  // name edit
  isEditingName,
  draftName,
  setDraftName,
  onStartEditName,
  onCancelEditName,
  onSaveEditName,
  // description edit
  isEditingDesc,
  draftDesc,
  setDraftDesc,
  onStartEditDesc,
  onCancelEditDesc,
  onSaveEditDesc,
  // inputs edit
  isEditingInputs,
  onStartEditInputs,
  onCloseEditInputs,
  onSaveEditInputs
}) {
  if (loading) return <div className="page">Loading combo…</div>;
  if (error) return <div className="page">Error: {error}</div>;
  if (!combo) return <div className="page">Not found</div>;

  const inputs = combo.inputs || [];
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

      <div className="combo-header">
        {isEditingName ? (
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              style={{ padding: 6, minWidth: 220 }}
            />
            <button onClick={onSaveEditName} style={{ cursor: "pointer" }}>
              Save
            </button>
            <button onClick={onCancelEditName} style={{ cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <h1 style={{ margin: 0 }}>{combo.name}</h1>
            <button onClick={onStartEditName} style={{ cursor: "pointer" }}>
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="combo-inputs">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <h4 style={{ margin: 0 }}>Input sequence</h4>
          <button onClick={onStartEditInputs} style={{ cursor: "pointer" }}>
            Edit inputs
          </button>
        </div>

        <div className="input-row">
          {inputs.length ? (
            inputs.map((input, index) => {
              const key = String(input).trim();
              const meta = inputMap?.[key];

              return (
                <InputPill
                  key={index}
                  label={key}
                  image={meta?.image || null}
                  description={meta?.description || key}
                />
              );
            })
          ) : (
            <div>No input sequence</div>
          )}
        </div>
      </div>

      {/* Combo details section */}
      <div className="combo-details">
        <div>
          <strong>Character:</strong> {character?.name || "—"}
        </div>

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

        <div>
          <strong>Description:</strong>{" "}
          {isEditingDesc ? (
            <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
              <textarea
                value={draftDesc}
                onChange={(e) => setDraftDesc(e.target.value)}
                rows={3}
                style={{ padding: 8, minWidth: 320, width: "100%", maxWidth: 640 }}
              />
              <button onClick={onSaveEditDesc} style={{ cursor: "pointer" }}>
                Save
              </button>
              <button onClick={onCancelEditDesc} style={{ cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          ) : (
            <span>
              {combo.description || "—"}
              <button onClick={onStartEditDesc} style={{ marginLeft: 10, cursor: "pointer" }}>
                Edit
              </button>
            </span>
          )}
        </div>

        <div>
          <strong>Combo likes:</strong> {combo.comboLikes ?? 0}
        </div>
      </div>

      {/* form below combo details and above ComboList */}
      <InputSequenceEditor
        inputMap={inputMap}
        InputPill={InputPill}
        isEditing={!!isEditingInputs}
        initialSequence={combo.inputs || []}
        initialDifficulty={combo.difficulty || "medium"}
        initialMeter={combo.meter ?? combo.meterCost ?? "0"}
        onClose={onCloseEditInputs}
        onSave={onSaveEditInputs}
      />

      {/* If/when you add ComboList, it should render below this editor */}
      {/* <ComboList ... /> */}
    </div>
  );
}