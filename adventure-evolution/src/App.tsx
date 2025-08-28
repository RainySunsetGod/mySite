import { useState } from "react";
import type { Creature } from "./data/creatures";
import { tryEvolve } from "./utils/evolution";
import type { Gear } from "./data/gear";

import CreatureCard from "./components/CreatureCard";
import StarterSelect from "./components/StarterSelect";
import ActionMenu from "./components/ActionMenu";

type Player = {
  creature: Creature;
  equipped: {
    weapon: string | null;
    armor: string | null;
    shield: string | null;
    pet: string | null;
    misc: string[];
  };
};

export default function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog((prev) => [...prev, message]);
  };

  const handleEquip = (gear: Gear) => {
    if (!player) return;
    setPlayer((prev) =>
      prev
        ? {
            ...prev,
            equipped: {
              ...prev.equipped,
              [gear.type.toLowerCase()]: gear.id,
            },
          }
        : null
    );
    addLog(`You equipped ${gear.name}!`);
  };

  const levelUp = () => {
    if (!player) return;
    const updated = { ...player.creature, level: player.creature.level + 1 };
    const evolved = tryEvolve(updated);
    setPlayer({
      ...player,
      creature: evolved,
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      {!player ? (
        <StarterSelect
          onChoose={(c) =>
            setPlayer({
              creature: c,
              equipped: { weapon: null, armor: null, shield: null, pet: null, misc: [] },
            })
          }
        />
      ) : (
        <>
          <CreatureCard creature={player.creature} onLevelUp={levelUp} />
          <ActionMenu onAction={addLog} onEquip={handleEquip} />

          <div
            style={{
              marginTop: "1rem",
              textAlign: "left",
              maxWidth: "400px",
              margin: "1rem auto",
            }}
          >
            <h3>Combat Log:</h3>
            <ul>
              {log.map((entry, i) => (
                <li key={i}>{entry}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <h3>Equipped Gear</h3>
            <p>Weapon: {player.equipped.weapon || "None"}</p>
            <p>Armor: {player.equipped.armor || "None"}</p>
            <p>Shield: {player.equipped.shield || "None"}</p>
            <p>Pet: {player.equipped.pet || "None"}</p>
          </div>
        </>
      )}
    </div>
  );
}
