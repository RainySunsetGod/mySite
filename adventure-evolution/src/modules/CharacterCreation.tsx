import { useState } from "react";
import type { Player } from "../state/player";
import { DEFAULT_PLAYER } from "../state/player";

type Props = {
  onCreate: (player: Player) => void;
};

export default function CharacterCreation({ onCreate }: Props) {
  const [name, setName] = useState("Hero");
  const [stats, setStats] = useState({
    STR: 5,
    DEX: 5,
    INT: 5,
    END: 5,
    CHA: 5,
    LUK: 5,
  });
  const [points, setPoints] = useState(5);

  type StatKey = keyof typeof stats;

  const adjustStat = (key: StatKey, delta: number) => {
    if (delta > 0 && points <= 0) return;
    if (stats[key] + delta < 1) return;

    setStats({ ...stats, [key]: stats[key] + delta });
    setPoints(points - delta);
  };

  const handleCreate = () => {
    onCreate({
      ...DEFAULT_PLAYER,
      name,
      stats,
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Create Your Character</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ margin: "0.5rem" }}
      />

      <h3>Distribute Stats (Points left: {points})</h3>
      {(Object.keys(stats) as StatKey[]).map((key) => (
        <div key={key}>
          {key}: {stats[key]}{" "}
          <button onClick={() => adjustStat(key, +1)}>+</button>
          <button onClick={() => adjustStat(key, -1)}>-</button>
        </div>
      ))}

      <button disabled={points > 0} onClick={handleCreate}>
        Start Adventure
      </button>
    </div>
  );
}
