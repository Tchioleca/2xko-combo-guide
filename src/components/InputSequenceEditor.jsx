import { useEffect, useMemo, useState } from "react";
import "./InputSequenceEditor.css";

const FALLBACK_INPUTS = ["1","2","3","4","5","6","7","8","9","LP","MP","HP","S1","S2","T","P"];

export default function InputSequenceEditor({
  // REQUIRED: your existing map from /inputs
  inputMap = {},

  // REQUIRED: your existing pill component (from ComboUI)
  InputPill,

  // current combo values
  initialSequence = [],
  initialDifficulty = "medium",
  initialMeter = "0",

  // optional override: list of keys to show in blue pad
  availableInputs,

  // choice-only options
  difficultyOptions = ["easy", "medium", "hard"],
  meterOptions = ["0", "1", "2", "3"],

  // edit mode
  isEditing = false,
  onClose,

  // save callback
  onSave
}) {
  const inputs = useMemo(() => {
    if (Array.isArray(availableInputs) && availableInputs.length) return availableInputs;

    const keys = inputMap && typeof inputMap === "object" ? Object.keys(inputMap) : [];
    if (keys.length) return keys;

    return FALLBACK_INPUTS;
  }, [availableInputs, inputMap]);

  const [sequence, setSequence] = useState(initialSequence);
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [meter, setMeter] = useState(String(initialMeter ?? "0"));

  useEffect(() => setSequence(initialSequence), [initialSequence]);
  useEffect(() => setDifficulty(initialDifficulty), [initialDifficulty]);
  useEffect(() => setMeter(String(initialMeter ?? "0")), [initialMeter]);

  const pushInput = (val) => setSequence((prev) => [...prev, val]);
  const popLast = () => setSequence((prev) => prev.slice(0, -1));
  const clearAll = () => setSequence([]);

  const handleSave = async () => {
    if (onSave) {
      await onSave({
        inputButtons: sequence,
        difficulty,
        meter
      });
    }
    if (onClose) onClose();
  };

  if (!isEditing) return null;

  if (!InputPill) {
    return (
      <div className="ise-root">
        <div className="ise-error">
          InputSequenceEditor requires the InputPill component to be passed in.
        </div>
      </div>
    );
  }

  return (
    <section className="ise-root">
      {/* 1) Top div: current input sequence array */}
      <div className="ise-seqBox">
        <div className="ise-title">inputs sequence:</div>

        <div className="ise-seqRow">
          {sequence.length === 0 ? (
            <span className="ise-empty">—</span>
          ) : (
            sequence.map((key, i) => {
              const meta = inputMap?.[String(key)] || null;
              return (
                <InputPill
                  key={`${key}-${i}`}
                  label={String(key)}
                  image={meta?.image || null}
                  description={meta?.description || String(key)}
                  className="ise-pill"
                />
              );
            })
          )}
        </div>
      </div>

      {/* Choice-only parameters */}
      <div className="ise-choices">
        <ChoiceRow
          label="difficulty"
          value={difficulty}
          options={difficultyOptions}
          onPick={setDifficulty}
        />
        <ChoiceRow
          label="meter"
          value={meter}
          options={meterOptions}
          onPick={(v) => setMeter(String(v))}
        />
      </div>

      {/* 2) Blue rectangle: static buttons representing all available inputs */}
      <div className="ise-bluePad">
        <div className="ise-blueHint">(click me)</div>

        <div className="ise-grid">
          {inputs.map((key) => {
            const k = String(key);
            const meta = inputMap?.[k] || null;

            return (
              <button
                key={k}
                type="button"
                className="ise-inputBtn"
                onClick={() => pushInput(k)}
                aria-label={`Add ${k}`}
              >
                <InputPill
                  label={k}
                  image={meta?.image || null}
                  description={meta?.description || k}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="ise-actions">
        <button type="button" className="ise-action ise-yellow" onClick={popLast}>
          POP
        </button>

        <button type="button" className="ise-action ise-green" onClick={handleSave}>
          SAVE
        </button>

        <button type="button" className="ise-action ise-red" onClick={clearAll}>
          CLEAR
        </button>
      </div>
    </section>
  );
}

function ChoiceRow({ label, value, options, onPick }) {
  return (
    <div className="ise-choiceRow">
      <div className="ise-choiceLabel">{label}:</div>
      <div className="ise-choiceBtns">
        {options.map((opt) => {
          const o = String(opt);
          const active = o === String(value);

          return (
            <button
              key={o}
              type="button"
              className={`ise-choiceBtn ${active ? "is-active" : ""}`}
              onClick={() => onPick(o)}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}