import { useState } from "react";
import { DEFAULT_PLAYER, type Player } from "./state/player";
import PlayerPanel from "./components/PlayerPanel";
import EnemyPanel from "./components/EnemyPanel";
import Combat from "./modules/Combat";
import Landing from "./modules/Landing";
import { ENEMIES, type EnemyTemplate, type CombatEnemy } from "./data/enemies";

function spawnEnemy(): CombatEnemy {
  const base: EnemyTemplate = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
  return {
    ...base,
    currentHp: base.maxHp,
    currentMp: base.maxMp,
    currentSp: base.maxSp,
  };
}

export default function App() {
  const [player, setPlayer] = useState<Player>(DEFAULT_PLAYER);
  const [enemy, setEnemy] = useState<CombatEnemy>(spawnEnemy());
  const [mode, setMode] = useState<"landing" | "combat">("landing");

  const enterCombat = () => {
    setEnemy(spawnEnemy()); // new random enemy
    setMode("combat");
  };

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
        <Landing onEnterCombat={enterCombat} />
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
