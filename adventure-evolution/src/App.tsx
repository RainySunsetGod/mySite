import { useState } from "react";
import { DEFAULT_PLAYER, type Player } from "./state/player";
import PlayerPanel from "./components/PlayerPanel";
import Combat from "./modules/Combat";
import Landing from "./modules/Landing";

export default function App() {
  const [player, setPlayer] = useState<Player>(DEFAULT_PLAYER);
  const [mode, setMode] = useState<"landing" | "combat">("landing");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "1rem",
        height: "100vh",
      }}
    >
      {/* Left side = always PlayerPanel */}
      <PlayerPanel player={player} />

      {/* Middle + Right depend on mode */}
      {mode === "landing" ? (
        <>
          <Landing onEnterCombat={() => setMode("combat")} />
          <div style={{ border: "2px solid red", padding: "1rem" }}>
            🌆 Town Info / NPCs
          </div>
        </>
      ) : (
        <Combat
          player={player}
          setPlayer={setPlayer}
          onExitCombat={() => setMode("landing")}
        />
      )}
    </div>
  );
}
