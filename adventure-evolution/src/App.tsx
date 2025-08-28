import { useState } from "react";
import { DEFAULT_PLAYER, type Player } from "./state/player";
import { tryEvolve, type EvolutionContext } from "./utils/evolution";
import { getContent } from "./data/library";
import ActionMenu from "./components/ActionMenu";
import { calculateStats } from "./utils/stats";
import StatBar from "./components/StatBar";

type Enemy = {
  name: string;
  currentHp: number;
  currentMp: number;
  currentSp: number;
  maxHp: number;
  maxMp: number;
  maxSp: number;
  attack: number;
  defense: number;
};

const DEFAULT_ENEMY: Enemy = {
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
  const [enemy, setEnemy] = useState<Enemy>(DEFAULT_ENEMY);
  // Placeholder: mark setEnemy as intentionally unused
  void setEnemy;

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

    setPlayer({
      ...player,
      level: newLevel,
      gearView: newGearView,
      // reset HP/MP/SP to new max when leveling up
      currentHp: stats.hp,
      currentMp: stats.mp,
      currentSp: stats.sp,
    });
  };

  const takeDamage = () => {
    setPlayer((p) => ({
      ...p,
      currentHp: Math.max(0, p.currentHp - 10),
    }));
  };

  const spendMana = () => {
    setPlayer((p) => ({
      ...p,
      currentMp: Math.max(0, p.currentMp - 5),
    }));
  };

  const spendStamina = () => {
    setPlayer((p) => ({
      ...p,
      currentSp: Math.max(0, p.currentSp - 7),
    }));
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
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Player</h2>
        <StatBar label="HP" current={player.currentHp} max={stats.hp} color="red" />
        <StatBar label="MP" current={player.currentMp} max={stats.mp} color="blue" />
        <StatBar label="SP" current={player.currentSp} max={stats.sp} color="green" />

        <button onClick={takeDamage} style={{ marginTop: "1rem" }}>
          Take 10 Damage
        </button>
        <button onClick={spendMana} style={{ marginTop: "0.5rem" }}>
          Spend 5 MP
        </button>
        <button onClick={spendStamina} style={{ marginTop: "0.5rem" }}>
          Spend 7 SP
        </button>
      </div>

      {/* Middle: Actions */}
      <div
        style={{
          border: "2px solid red",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Level {player.level} Adventurer</h1>

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

      {/* Right: Enemy */}
      <div
        style={{
          border: "2px solid red",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>{enemy.name}</h2>
        <StatBar label="HP" current={enemy.currentHp} max={enemy.maxHp} color="red" />
        <StatBar label="MP" current={enemy.currentMp} max={enemy.maxMp} color="blue" />
        <StatBar label="SP" current={enemy.currentSp} max={enemy.maxSp} color="green" />
      </div>
    </div>
  );
}
