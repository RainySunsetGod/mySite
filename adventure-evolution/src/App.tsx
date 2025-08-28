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
      currentHp: stats.hp,
      currentMp: stats.mp,
      currentSp: stats.sp,
      maxHp: stats.hp,
      maxMp: stats.mp,
      maxSp: stats.sp,
    });
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

        <div style={{ marginTop: "1rem" }}>
          <h3>Core Stats</h3>
          <p>STR: {player.stats.STR}</p>
          <p>DEX: {player.stats.DEX}</p>
          <p>INT: {player.stats.INT}</p>
          <p>END: {player.stats.END}</p>
          <p>CHA: {player.stats.CHA}</p>
          <p>LUK: {player.stats.LUK}</p>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h3>Derived Stats</h3>
          <p>Attack: {stats.attack}</p>
          <p>Defense: {stats.defense}</p>
          <p>Accuracy: {stats.accuracy.toFixed(1)}%</p>
          <p>Crit Chance: {stats.critChance.toFixed(1)}%</p>
          <p>Pet Power: {stats.petPower}</p>
        </div>
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
