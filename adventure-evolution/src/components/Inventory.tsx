import { useState } from "react";
import type { Player } from "../state/player";
import { getContent } from "../data/library";
import type { ContentType, ContentItem } from "../data/library/types";
import ItemDetails from "./ItemDetails";
import styles from "./Inventory.module.css";

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
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

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
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <h2 className={`${styles.title} neon-flicker`}>Inventory</h2>

        <div className={styles.categoryBar}>
          {Object.entries(TYPE_ICONS).map(([type, icon]) => (
            <button
              key={type}
              onClick={() => setActiveType(type as ContentType)}
              className={`${styles.categoryButton} ${activeType === type ? styles.categoryButtonActive : ""}`}
              title={type}
            >
              {icon}
            </button>
          ))}
        </div>

        <div className={styles.inventoryList}>
          {filteredItems.length === 0 ? (
            <p>No items in this category.</p>
          ) : (
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDraggedId(item.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item.id)}
                onClick={() => setSelectedItem(item)}
                className={`${styles.itemCard} ${draggedId === item.id ? styles.dragging : ""}`}
              >
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.arrowGroup}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveItemInCategory(item.id, -1);
                    }}
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveItemInCategory(item.id, 1);
                    }}
                    disabled={index === filteredItems.length - 1}
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>

      <ItemDetails item={selectedItem} />
    </div>

  );
}
