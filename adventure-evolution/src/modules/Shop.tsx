import { useState } from "react";
import { getContent } from "../data/library";
import type { Player } from "../state/player";
import type { ContentType, ContentItem } from "../data/library/types";
import { saveProgress } from "../utils/game";
import ItemDetails from "../components/ItemDetails"; // ✅ new shared component

type Props = {
  player: Player;
  setPlayer: (p: Player) => void;
  shopName: string;
  stock: string[];
  onExit: () => void;
};

const TYPE_ICONS: Record<ContentType, string> = {
  Weapon: "🗡️",
  Armor: "🧥",
  Shield: "🛡️",
  Pet: "🐾",
  Spell: "🪄",
  Misc: "🎒",
};

export default function Shop({ player, setPlayer, shopName, stock, onExit }: Props) {
  const [activeType, setActiveType] = useState<ContentType>("Weapon");
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const fullStock: ContentItem[] = stock
    .map(getContent)
    .filter((item): item is ContentItem => item !== undefined);

  const filteredStock = fullStock.filter((item) => item.type === activeType);

  const buyItem = (id: string) => {
    if (player.inventory.includes(id)) {
      alert("You already own this item!");
      return;
    }
    const updated = { ...player, inventory: [...player.inventory, id] };
    setPlayer(updated);
    saveProgress(updated);
    alert(`Bought ${getContent(id)?.name}!`);
  };

  return (
    <div style={{ display: "flex", padding: "2rem", gap: "2rem" }}>
      {/* Left: Shop List */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <h2>{shopName}</h2>

        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            gap: "0.5rem",
          }}
        >
          {Object.entries(TYPE_ICONS).map(([type, icon]) => (
            <button
              key={type}
              onClick={() => setActiveType(type as ContentType)}
              style={{
                width: "48px",
                height: "48px",
                fontSize: "1.5rem",
                backgroundColor: type === activeType ? "#ffcc00" : "#eee",
                border: "2px solid #555",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              title={type}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Shop Items */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            maxHeight: "400px",
            overflowY: "auto",
            padding: "0.5rem",
          }}
        >
          {filteredStock.length === 0 ? (
            <p>No {activeType.toLowerCase()}s for sale.</p>
          ) : (
            filteredStock.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  width: "260px",
                  padding: "0.75rem",
                  border: "2px solid #444",
                  borderRadius: "6px",
                  backgroundColor: player.inventory.includes(item.id)
                    ? "#777"
                    : "#1976d2",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span>{item.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    buyItem(item.id);
                  }}
                  disabled={player.inventory.includes(item.id)}
                  style={{
                    marginLeft: "0.5rem",
                    backgroundColor: player.inventory.includes(item.id)
                      ? "#555"
                      : "#4caf50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.25rem 0.5rem",
                    cursor: player.inventory.includes(item.id)
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {player.inventory.includes(item.id) ? "Owned" : "Buy"}
                </button>
              </div>
            ))
          )}
        </div>

        <button
          onClick={onExit}
          style={{ marginTop: "2rem", padding: "0.5rem 1.25rem" }}
        >
          Leave Shop
        </button>
      </div>

      {/* Right: Item Details */}
      <ItemDetails item={selectedItem} />
    </div>
  );
}
