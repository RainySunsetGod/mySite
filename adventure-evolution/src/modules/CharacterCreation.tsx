import { useState } from "react";
import type { Player } from "../state/player";
import { DEFAULT_PLAYER } from "../state/player";
import { listByType } from "../data/library";
import type { ContentItem } from "../data/library/types";

type Props = {
  onCreate: (player: Player) => void;
};

// Fetch only armors tagged as "starter"
const STARTING_ARMORS: ContentItem[] = listByType("Armor").filter(
  (item) => item.tags?.includes("starter")
);

export default function CharacterCreation({ onCreate }: Props) {
  const [name, setName] = useState("Hero");
  const [selectedArmorId, setSelectedArmorId] = useState(STARTING_ARMORS[0]?.id || "");

  const handleCreate = () => {
    const newPlayer: Player = {
      ...DEFAULT_PLAYER,
      name,
      gearView: {
        ...DEFAULT_PLAYER.gearView,
        Armor: [selectedArmorId],
      },
      inventory: [...DEFAULT_PLAYER.inventory, selectedArmorId],
    };

    onCreate(newPlayer);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Create Your Character</h2>

      <label>
        <strong>Name:</strong>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "0.5rem" }}
        />
      </label>

      <h3>Choose Your Starting Armor</h3>
      {STARTING_ARMORS.map((armor) => (
        <div key={armor.id} style={{ margin: "1rem", padding: "0.5rem" }}>
          <label>
            <input
              type="radio"
              name="startingArmor"
              value={armor.id}
              checked={selectedArmorId === armor.id}
              onChange={() => setSelectedArmorId(armor.id)}
              style={{ marginRight: "0.5rem" }}
            />
            <strong>{armor.name}</strong>
          </label>
          {armor.description && (
            <p style={{ fontSize: "0.9rem", marginTop: "0.25rem" }}>
              {armor.description}
            </p>
          )}
        </div>
      ))}

      <button onClick={handleCreate} disabled={!selectedArmorId}>
        Start Adventure
      </button>
    </div>
  );
}
