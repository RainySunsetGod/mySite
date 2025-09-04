import type { ContentItem } from "../data/library/types";
import { ELEMENT_DETAILS } from "../modules/elements";

const ATTACK_TYPE_ICONS: Record<"melee" | "ranged" | "magic", string> = {
  melee: "⚔️",
  ranged: "🏹",
  magic: "✨",
};

export default function ItemDetails({ item }: { item: ContentItem | null }) {
  if (!item) return null;

  return (
    <div
      style={{
        position: "absolute", // ✅ overlay, not inline
        top: "1rem",
        right: "1rem",
        width: "300px",
        border: "2px solid #444",
        borderRadius: "6px",
        backgroundColor: "#222",
        padding: "1rem",
        color: "white",
        textAlign: "left",
        zIndex: 1000, // ✅ ensures it’s above everything else
      }}
    >
      <h3>{item.name}</h3>
      {item.description && (
        <p style={{ fontStyle: "italic" }}>{item.description}</p>
      )}
      <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem" }}>
        {/* Weapons */}
        {item.damage && (
          <li>
            ⚔️ Damage: {item.damage.min}–{item.damage.max}
          </li>
        )}
        {item.attackType && (
          <li>
            {ATTACK_TYPE_ICONS[item.attackType]} Type: {item.attackType}
          </li>
        )}
        {item.element && (
          <li style={{ color: ELEMENT_DETAILS[item.element].color }}>
            🌟 Element: {ELEMENT_DETAILS[item.element].label}
          </li>
        )}
        {item.accuracy !== undefined && (
          <li>🎯 Accuracy Bonus: +{item.accuracy}%</li>
        )}
        {item.critBonus !== undefined && (
          <li>💥 Crit Bonus: +{item.critBonus}%</li>
        )}

        {/* Armor/Shield Resistances */}
        {item.resistances &&
          Object.entries(item.resistances).map(([el, val]) => (
            <li key={el}>
              🛡️ {ELEMENT_DETAILS[el as keyof typeof ELEMENT_DETAILS].label}:{" "}
              {val}%
            </li>
          ))}

        {/* Spells */}
        {item.power !== undefined && (
          <li>
            {item.power > 0
              ? `🔥 Power: ${item.power} damage`
              : `✨ Healing: ${Math.abs(item.power)}`}
          </li>
        )}
        {item.cost !== undefined && <li>🔹 Cost: {item.cost} MP</li>}

        {/* Specials */}
        {item.special && <li>⭐ {item.special}</li>}
      </ul>
    </div>
  );
}
