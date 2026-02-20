import React from "react";

// One “pill” for an input: image if available, else text
export function InputPill({ label, image, description }) {
  return (
    <div className="pill" title={description || label}>
      {image ? (
        <img src={image} alt={label} style={{ maxHeight: "100%", maxWidth: "100%" }} />
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}

/* =========================
   Difficulty Box (UPDATED)
   ========================= */
export function DifficultyBox({ level }) {
  const value = String(level || "").toLowerCase();

  const colors = {
    easy: "#90EE90",
    medium: "#FFD700",
    hard: "#FF6B6B"
  };

  const color = colors[value] || "#ccc";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 60,
        height: 26,
        padding: "0 8px",
        background: color,
        borderRadius: 6,
        fontWeight: 900,
        fontSize: "0.75rem",
        textTransform: "uppercase",
        color: "#000",
        marginRight: 6
      }}
    >
      {value}
    </div>
  );
}

/* =========================
   Meter Box (UPDATED)
   ========================= */
export function MeterBox({ level }) {
  const value = String(level || "");

  const colors = {
    1: "#FFD700",
    2: "#FF8C00",
    3: "#FF6B6B"
  };

  const color = colors[value] || "#ccc";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 32,
        height: 26,
        padding: "0 6px",
        background: color,
        borderRadius: 6,
        fontWeight: 900,
        fontSize: "0.75rem",
        color: "#000",
        marginRight: 6
      }}
    >
      {value}
    </div>
  );
}