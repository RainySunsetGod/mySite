type Props = {
  onEnterCombat: () => void;
};

export default function Landing({ onEnterCombat }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "url('/town-bg.png') center/cover no-repeat", // ✅ background image
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          padding: "1rem 2rem",
          border: "2px solid black",
          borderRadius: "8px",
        }}
      >
        <h1>🏰 Town Square</h1>
        <p>Welcome, adventurer! What will you do?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
          <button onClick={onEnterCombat}>⚔️ Battle Monsters</button>
          <button>🛒 Visit Shop</button>
          <button>💪 Train Stats</button>
          <button>🛏️ Rest at Inn</button>
        </div>
      </div>
    </div>
  );
}
