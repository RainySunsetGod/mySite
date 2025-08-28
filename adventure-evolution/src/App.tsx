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

    // Build evolution context from real player state
    const context: EvolutionContext = {
      level: newLevel,
      inventory: player.materials, // materials collected
      merges: player.merges,       // merges done
      usage: player.usage,         // times spells/items used
    };

    // Evolve items in gearView
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
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Level {player.level} Adventurer</h1>
      <p>HP: {stats.hp}</p>
      <p>MP: {stats.mp}</p>
      <p>Attack: {stats.attack}</p>
      <p>Defense: {stats.defense}</p>

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
