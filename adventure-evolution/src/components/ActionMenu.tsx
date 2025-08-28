import { useState } from "react";
import { weapons, armors, shields, pets, miscItems} from "../data/gear";
import type { Gear } from "../data/gear";

type Props = {
  onAction: (message: string) => void; // log battle text
  onEquip: (gear: Gear) => void;       // equip gear
};

export default function ActionMenu({ onAction, onEquip }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  let gearList: Gear[] = [];
  if (selectedCategory === "Weapons") gearList = weapons;
  if (selectedCategory === "Armor") gearList = armors;
  if (selectedCategory === "Shields") gearList = shields;
  if (selectedCategory === "Pets") gearList = pets;
  if (selectedCategory === "Misc") gearList = miscItems;

  return (
    <div style={{ marginTop: "1rem" }}>
      {!selectedCategory ? (
        <div>
          <h3>Choose a Category:</h3>
          {[
            "Attack",
            "Spells",
            "Skills",
            "Run",
            "Weapons",
            "Armor",
            "Shields",
            "Pets",
            "Misc",
          ].map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h3>{selectedCategory}</h3>

          {gearList.length > 0 ? (
            gearList.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  onEquip(g);
                  setSelectedCategory(null);
                }}
              >
                {g.name}
              </button>
            ))
          ) : (
            <>
              <button
                onClick={() => {
                  if (selectedCategory === "Attack") onAction("⚔️ You strike the enemy!");
                  if (selectedCategory === "Spells") onAction("🔥 You cast a fireball!");
                  if (selectedCategory === "Skills") onAction("💥 You perform a skill!");
                  if (selectedCategory === "Run") onAction("🏃 You try to run away...");
                  setSelectedCategory(null);
                }}
              >
                Execute
              </button>
            </>
          )}

          <div>
            <button onClick={() => setSelectedCategory(null)}>⬅ Back</button>
          </div>
        </div>
      )}
    </div>
  );
}
