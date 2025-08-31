type Props = {
  current: number;
  max: number;
  color: string;
  align?: "left" | "right";
};

export default function StatBar({ current, max, color, align = "left" }: Props) {
  const percentage = (current / max) * 100;

  return (
    <div
      style={{
        height: "16px",
        background: "#ccc",
        position: "relative",
        overflow: "hidden",
        borderRadius: "4px",
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
      <span
        style={{
          position: "absolute",
          width: "100%",
          textAlign: "center",
          fontSize: "0.75rem",
          lineHeight: "16px",
          color: "white",
          textShadow: "0 0 2px black",
          pointerEvents: "none",
        }}
      >
        {current} / {max}
      </span>
    </div>
  );
}
