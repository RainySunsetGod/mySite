type Props = {
  current: number;
  max: number;
  color: string;
  align?: "left" | "right";
};

export default function StatBar({ current, max, color, align = "left" }: Props) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div
      style={{
        height: "18px",
        background: "#333", // darker background so text is always visible
        position: "relative",
        overflow: "hidden",
        borderRadius: "4px",
        border: "1px solid #000",
      }}
    >
      {/* Filled portion */}
      <div
        style={{
          width: `${percentage}%`,
          background: color,
          height: "100%",
          position: "absolute",
          top: 0,
          bottom: 0,
          [align === "right" ? "right" : "left"]: 0,
          transition: "width 0.3s ease",
        }}
      />

      {/* Value text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          fontWeight: "bold",
          color: "#fff",
          textShadow: "0 0 3px #000, 0 0 5px #000",
          pointerEvents: "none",
        }}
      >
        {current} / {max}
      </div>
    </div>
  );
}
