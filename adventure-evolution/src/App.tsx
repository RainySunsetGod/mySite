import { useState } from "react";
import { DEFAULT_PLAYER, type Player } from "./state/player";
import { tryEvolve, type EvolutionContext } from "./utils/evolution";
import { getContent } from "./data/library";
import ActionMenu from "./components/ActionMenu";
import PlayerPanel from "./components/PlayerPanel";
import EnemyPanel from "./components/EnemyPanel";

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
  // Placeholder: mark setEnemy as intentionally unused
  void setEnemy;

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
      currentHp: player.maxHp,
      currentMp: player.maxMp,
      currentSp: player.maxSp,
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "1rem",
        height: "100vh", // ✅ match viewport height exactly
        boxSizing: "border-box",
      }}
    >
      <PlayerPanel player={player} />

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

      <EnemyPanel enemy={enemy} />
    </div>
  );
}
