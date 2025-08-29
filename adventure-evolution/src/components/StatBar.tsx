type Props = {
  label: string;
  current: number;
  max: number;
  color: string;
  align?: "left" | "right"; // NEW prop
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
      <div
        style={{
          fontSize: "0.8rem",
          textAlign: align, // ✅ label alignment
        }}
      >
        {label}: {current}/{max}
      </div>
      <div
        style={{
          height: "12px",
          background: "#ccc",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            background: color,
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}
