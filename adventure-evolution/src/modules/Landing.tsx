type Props = {
  onEnterCombat: () => void;
};

export default function Landing({ onEnterCombat }: Props) {
  return (
    <div
      style={{
        border: "2px solid red",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <h1>🏰 Town Square</h1>
      <p>Welcome, adventurer! What will you do?</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
        <button onClick={onEnterCombat}>⚔️ Battle Monsters</button>
        <button onClick={() => alert("Shop not yet implemented!")}>🛒 Visit Shop</button>
        <button onClick={() => alert("Training not yet implemented!")}>💪 Train Stats</button>
        <button onClick={() => alert("Resting not yet implemented!")}>🛏️ Rest at Inn</button>
      </div>
    </div>
  );
}
