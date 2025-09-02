import type { ContentItem } from "../data/library/types";

type Props = {
  item: ContentItem;
};

export default function ItemDetails({ item }: Props) {
  return (
    <div style={{ fontSize: "0.8rem", color: "#eee", marginTop: "0.25rem" }}>
      {/* Description */}
      {item.description && (
        <div style={{ fontStyle: "italic", marginBottom: "0.25rem" }}>
          {item.description}
        </div>
      )}

      {/* Stats */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {item.attackBoost !== undefined && <li>⚔️ Attack: +{item.attackBoost}</li>}
        {item.defenseBoost !== undefined && <li>🛡️ Defense: +{item.defenseBoost}</li>}
        {item.power !== undefined && (
          <li>
            {item.power > 0
              ? `🔥 Power: ${item.power} damage`
              : `✨ Healing: ${Math.abs(item.power)}`}
          </li>
        )}
        {item.cost !== undefined && <li>🔹 Cost: {item.cost} MP</li>}
        {item.special && <li>⭐ {item.special}</li>}
      </ul>
    </div>
  );
}
