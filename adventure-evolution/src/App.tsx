import { useState } from "react";
import type{ Creature } from "./data/creatures";
import { tryEvolve } from "./utils/evolution";
import CreatureCard from "./components/CreatureCard";
import StarterSelect from "./components/StarterSelect";

export default function App() {
  const [creature, setCreature] = useState<Creature | null>(null);

  const levelUp = () => {
    if (!creature) return;
    const updated = { ...creature, level: creature.level + 1 };
    setCreature(tryEvolve(updated));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      {!creature ? (
        <StarterSelect onChoose={(c) => setCreature(c)} />
      ) : (
        <CreatureCard creature={creature} onLevelUp={levelUp} />
      )}
    </div>
  );
}
