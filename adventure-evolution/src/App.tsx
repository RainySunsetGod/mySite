import { useState } from "react";
import { DEFAULT_PLAYER, type Player } from "./state/player";
import { tryEvolve } from "./utils/evolution";
import { getContent } from "./data/library/index";
import ActionMenu from "./components/ActionMenu";

export default function App() {
  const [player, setPlayer] = useState<Player>(DEFAULT_PLAYER);

  const levelUp = () => {
    const newLevel = player.level + 1;
    const newGearView = { ...player.gearView };

    // Evolve items in gearView
    for (const category in newGearView) {
      newGearView[category as keyof typeof newGearView] =
        newGearView[category as keyof typeof newGearView].map((id) => {
          const item = getContent(id);
          if (!item) return id;
          return tryEvolve(item, newLevel).id;
        });
    }

    setPlayer({ ...player, level: newLevel, gearView: newGearView });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Level {player.level} Adventurer</h1>
      <p>HP: {player.hp}</p>

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
  );
}
