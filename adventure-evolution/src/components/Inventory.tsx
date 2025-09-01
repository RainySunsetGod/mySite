import { useState } from "react";
import type { Player } from "../state/player";
import { getContent } from "../data/library";
import type { ContentType, ContentItem } from "../data/library/types";

type Props = {
  player: Player;
  onClose: () => void;
  setPlayer: (p: Player) => void;
};

const TYPE_ICONS: Record<ContentType, string> = {
  Weapon: "🗡️",
  Armor: "🧥",
  Shield: "🛡️",
  Pet: "🐾",
  Spell: "🪄",
  Misc: "🎒",
};

export default function InventoryScreen({ player, onClose, setPlayer }: Props) {
  const [activeType, setActiveType] = useState<ContentType>("Weapon");
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const fullInventory: ContentItem[] = player.inventory
    .map(getContent)
    .filter((item): item is ContentItem => item !== undefined);

  const filteredItems = fullInventory.filter((item) => item.type === activeType);

  const moveItemInCategory = (itemId: string, direction: -1 | 1) => {
    const filteredIds = filteredItems.map((i) => i.id);
    const indexInFiltered = filteredIds.findIndex((id) => id === itemId);
    const newIndexInFiltered = indexInFiltered + direction;

    if (newIndexInFiltered < 0 || newIndexInFiltered >= filteredIds.length) return;

    const idA = filteredIds[indexInFiltered];
    const idB = filteredIds[newIndexInFiltered];

    const indexA = player.inventory.findIndex((id) => id === idA);
    const indexB = player.inventory.findIndex((id) => id === idB);

    if (indexA === -1 || indexB === -1) return;

    const updated = [...player.inventory];
    [updated[indexA], updated[indexB]] = [updated[indexB], updated[indexA]];

    setPlayer({ ...player, inventory: updated });
  };

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;

    const filteredIds = filteredItems.map((i) => i.id);
    const draggedIndex = filteredIds.indexOf(draggedId);
    const targetIndex = filteredIds.indexOf(targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Work in full inventory
    const draggedFullIndex = player.inventory.findIndex((id) => id === draggedId);
    const targetFullIndex = player.inventory.findIndex((id) => id === targetId);

    if (draggedFullIndex === -1 || targetFullIndex === -1) return;

    const updated = [...player.inventory];
    const [movedItem] = updated.splice(draggedFullIndex, 1);
    updated.splice(targetFullIndex, 0, movedItem);

    setPlayer({ ...player, inventory: updated });
    setDraggedId(null);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Inventory</h2>

      {/* Category Icons */}
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

      {/* Inventory List */}
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
        {filteredItems.length === 0 ? (
          <p>No items in this category.</p>
        ) : (
          filteredItems.map((item, index) => {
            return (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDraggedId(item.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item.id)}
                style={{
                  width: "260px",
                  padding: "0.75rem",
                  border: "2px solid #444",
                  borderRadius: "6px",
                  backgroundColor:
                    draggedId === item.id ? "#aa2222" : "#d33",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: draggedId === item.id ? 0.6 : 1,
                  cursor: "grab",
                }}
              >
                <div style={{ flex: 1, textAlign: "left" }}>
                  {item.name}
                  {item.special && (
                    <div style={{ fontSize: "0.75rem", color: "#ddd" }}>
                      {item.special}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <button
                    onClick={() => moveItemInCategory(item.id, -1)}
                    disabled={index === 0}
                    style={{
                      fontSize: "0.75rem",
                      opacity: index === 0 ? 0.5 : 1,
                      cursor: index === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItemInCategory(item.id, 1)}
                    disabled={index === filteredItems.length - 1}
                    style={{
                      fontSize: "0.75rem",
                      opacity: index === filteredItems.length - 1 ? 0.5 : 1,
                      cursor:
                        index === filteredItems.length - 1
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    ↓
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={onClose}
        style={{ marginTop: "2rem", padding: "0.5rem 1.25rem" }}
      >
        Close
      </button>
    </div>
  );
}
