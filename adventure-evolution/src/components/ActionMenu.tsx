import { useState } from "react";
import { weapons, armors, shields, pets, miscItems} from "../data/gear";
import type { Gear } from "../data/gear";

type Props = {
  onAction: (message: string) => void;
  onEquip: (gear: Gear) => void;
};

export default function ActionMenu({ onAction, onEquip }: Props) {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  // Decide which list to show
  let gearList: Gear[] = [];
  if (activePanel === "Weapons") gearList = weapons;
  if (activePanel === "Armor") gearList = armors;
  if (activePanel === "Shields") gearList = shields;
  if (activePanel === "Pets") gearList = pets;
  if (activePanel === "Misc") gearList = miscItems;

  return (
    <div style={{ display: "flex", gap: "2rem", marginTop: "1rem", justifyContent: "center" }}>
      {/* --- Main Menu --- */}
      <div>
        <h3>Main Actions</h3>
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
          <button
            key={cat}
            onClick={() => {
              if (cat === "Attack") onAction("⚔️ You strike the enemy!");
              if (cat === "Spells") onAction("🔥 You cast a fireball!");
              if (cat === "Skills") onAction("💥 You perform a skill!");
              if (cat === "Run") onAction("🏃 You try to run away...");

              if (["Weapons", "Armor", "Shields", "Pets", "Misc"].includes(cat)) {
                setActivePanel(cat);
              }
            }}
            style={{ display: "block", margin: "0.25rem auto" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- Sliding Side Panel --- */}
      <div
        className={`side-panel ${activePanel ? "open" : ""}`}
      >
        {activePanel && gearList.length > 0 && (
          <div style={{ padding: "1rem" }}>
            <h4>{activePanel}</h4>
            {gearList.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  onEquip(g);
                  setActivePanel(null);
                }}
                style={{ display: "block", margin: "0.25rem auto" }}
              >
                {g.name}
              </button>
            ))}
            <button style={{ marginTop: "0.5rem" }} onClick={() => setActivePanel(null)}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
