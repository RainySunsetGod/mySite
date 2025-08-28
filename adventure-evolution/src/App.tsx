import { useState } from "react";
import { DEFAULT_PLAYER, type Player } from "./state/player";
import { tryEvolve, type EvolutionContext } from "./utils/evolution";
import { getContent } from "./data/library";
import ActionMenu from "./components/ActionMenu";
import { calculateStats } from "./utils/stats";

export default function App() {
  const [player, setPlayer] = useState<Player>(DEFAULT_PLAYER);
  const stats = calculateStats(player);

  const levelUp = () => {
    const newLevel = player.level + 1;
    const newGearView = { ...player.gearView };

    const context: EvolutionContext = {
      level: newLevel,
      inventory: player.materials,
      merges: player.merges,
      usage: player.usage,
    };

    for (const category in newGearView) {
      newGearView[category as keyof typeof newGearView] =
        newGearView[category as keyof typeof newGearView].map((id) => {
          const item = getContent(id);
          if (!item) return id;
          return tryEvolve(item, context).id;
        });
    }

    setPlayer({ ...player, level: newLevel, gearView: newGearView });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "1rem",
        padding: "1rem",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Left: Player */}
      <div
        style={{
          border: "2px solid red",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Player</h2>
      </div>

      {/* Center: Stats + Actions + Log */}
      <div
        style={{
          border: "2px solid red",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Top: Stats */}
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <h1>Level {player.level} Adventurer</h1>
          <p>HP: {stats.hp}</p>
          <p>MP: {stats.mp}</p>
          <p>Attack: {stats.attack}</p>
          <p>Defense: {stats.defense}</p>
        </div>

        {/* Middle: Actions */}
        <div style={{ marginBottom: "1rem" }}>
          <h3>Actions</h3>
          <ActionMenu
            player={player}
            onUse={(item) => {
              alert(`Used ${item.name}!`);
            }}
          />
          <button onClick={levelUp} style={{ marginTop: "1rem" }}>
            Level Up
          </button>
        </div>

        {/* Bottom: Log placeholder */}
        <div
          style={{
            marginTop: "auto",
            width: "100%",
            border: "1px solid #333",
            minHeight: "150px",
            background: "#fafafa",
          }}
        >
          <h4 style={{ margin: "0.5rem" }}>Combat Log</h4>
          <p style={{ margin: "0.5rem" }}>No actions yet...</p>
        </div>
      </div>

      {/* Right: Enemy */}
      <div
        style={{
          border: "2px solid red",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Enemy</h2>
      </div>
    </div>
  );
}
