import { useState } from "react";
import { DEFAULT_PLAYER, type Player } from "./state/player";
import PlayerPanel from "./components/PlayerPanel";
import EnemyPanel from "./components/EnemyPanel";
import Combat from "./modules/Combat";
import Landing from "./modules/Landing";

const DEFAULT_ENEMY = {
  name: "Slime",
  currentHp: 40,
  currentMp: 10,
  currentSp: 20,
  maxHp: 40,
  maxMp: 10,
  maxSp: 20,
  attack: 5,
  defense: 2,
};

export default function App() {
  const [player, setPlayer] = useState<Player>(DEFAULT_PLAYER);
  const [enemy, setEnemy] = useState(DEFAULT_ENEMY);
  const [mode, setMode] = useState<"landing" | "combat">("landing");

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {mode === "landing" ? (
        <Landing onEnterCombat={() => setMode("combat")} />
      ) : (
        <Combat
          player={player}
          setPlayer={setPlayer}
          enemy={enemy}
          setEnemy={setEnemy}
          onExitCombat={() => setMode("landing")}
        />
      )}

      {/* Overlays */}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0 }}>
        <PlayerPanel player={player} />
      </div>
      {mode === "combat" && (
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0 }}>
          <EnemyPanel enemy={enemy} />
        </div>
      )}
    </div>
  );
}
