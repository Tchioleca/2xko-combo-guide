const buttonData = [
  { button: "LP", description: "Light-Punch", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771325912/Glyph-L_nyq5kz.svg" },
  { button: "MP", description: "Medium-Punch", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771325913/Glyph-M_kzoyhg.svg" },
  { button: "HP", description: "Heavy-Punch", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771325911/Glyph-H_b0f5cw.svg" },
  { button: "S1", description: "Special-Move-1", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771325914/Glyph-S1_eadrts.svg" },
  { button: "S2", description: "Special-Move-2", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771325775/Glyph-S2_pndocd.svg" },
  { button: "S1S", description: "Super-Move-1", image: null },
  { button: "S2S", description: "Super-Move-2", image: null },
  { button: "S1S2", description: "Ultimate-Move", image: null },
  { button: "5", description: "Neutral-Input", image: null },
  { button: "2", description: "Down", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771325911/Glyph-down_sohxtf.svg" },
  { button: "6", description: "Forward", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771325773/Glyph-forward_lxoagl.svg" },
  { button: "4", description: "Back", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771325773/Glyph-back_hxprfx.svg" },
  { button: "8", description: "Up", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771325917/Glyph-up_lzwsrh.svg" },
  { button: "3", description: "Down-Forward", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771496103/Glyph-Down-Forward_xm85te.svg" },
  { button: "1", description: "Down-Back", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771496103/Glyph-down-back_ufzd9p.svg" },
  { button: "9", description: "Up-Forward", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771496103/Glyph-Up-Forward_qpxrya.svg" },
  { button: "7", description: "Up-Back", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771496103/Glyph-Up-Back_dg5tmr.svg" },
  { button: "T", description: "Tag", image: "https://res.cloudinary.com/dywiabwjp/image/upload/v1771325916/Glyph-T_dc18ly.svg" }
];

export function ButtonImages() {
  return (
    <div className="button-images-row" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
      {buttonData.map((btn) => (
        <div
          key={btn.button}
          className="pill"
          title={btn.description}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 60 }}
        >
          {btn.image ? (
            <img src={btn.image} alt={btn.button} style={{ maxHeight: 40, maxWidth: 40, marginBottom: 4 }} />
          ) : (
            <span style={{ fontWeight: "bold", fontSize: 18 }}>{btn.button}</span>
          )}
          <span style={{ fontSize: 12 }}>{btn.description}</span>
        </div>
      ))}
    </div>
  );
}
