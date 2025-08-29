type Props = {
  label: string;
  current: number;
  max: number;
  color: string;
  align?: "left" | "right"; // text + fill alignment
};

export default function StatBar({
  label,
  current,
  max,
  color,
  align = "left",
}: Props) {
  const percentage = (current / max) * 100;

  return (
    <div style={{ marginBottom: "0.25rem" }}>
      {/* Label */}
      <div
        style={{
          fontSize: "0.8rem",
          textAlign: align,
        }}
      >
        {label}: {current}/{max}
      </div>

      {/* Bar background */}
      <div
        style={{
          height: "12px",
          background: "#ccc",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Bar fill (mirrors based on align) */}
        <div
          style={{
            width: `${percentage}%`,
            background: color,
            height: "100%",
            position: "absolute",
            top: 0,
            bottom: 0,
            [align === "right" ? "right" : "left"]: 0, // ✅ anchor fill to correct side
          }}
        />
      </div>
    </div>
  );
}
