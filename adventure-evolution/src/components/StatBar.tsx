type StatBarProps = {
  label: string;
  current: number;
  max: number;
  color: string; // e.g., "red" for HP, "blue" for MP, "green" for SP
};

export default function StatBar({ label, current, max, color }: StatBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <div style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>
        {label}: {current}/{max}
      </div>
      <div
        style={{
          width: "200px",
          height: "16px",
          background: "#ddd",
          border: "1px solid #333",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: color,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
