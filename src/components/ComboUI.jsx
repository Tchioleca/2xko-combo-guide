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

export function DifficultyBox({ level }) {
  const colors = { easy: "#90EE90", medium: "#FFD700", hard: "#FF6B6B" };
  const color = colors[level] || "#ccc";

  return (
    <div
      style={{
        display: "inline-block",
        width: 24,
        height: 24,
        background: color,
        marginRight: 6,
        borderRadius: 4
      }}
    />
  );
}

export function MeterBox({ level }) {
  // NOTE: level will be a string like "1" after split(",")
  const colors = { 1: "#FFD700", 2: "#FF8C00", 3: "#FF6B6B" };
  const color = colors[level] || "#ccc";

  return (
    <div
      style={{
        display: "inline-block",
        width: 24,
        height: 24,
        background: color,
        marginRight: 6,
        borderRadius: 4
      }}
    />
  );
}
