import { useState } from "react";
import { getContent } from "../data/library";
import type { Player } from "../state/player";
import type { ContentType, ContentItem } from "../data/library/types";
import { saveProgress } from "../utils/game";
import ItemDetails from "../components/ItemDetails";
import styles from "./Shop.module.css"; // ✅ import new CSS

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
    <div className={styles.container}>
      {/* Left: Shop List */}
      <div className={styles.leftPanel}>
        <h2 className={`${styles.title} neon-flicker`}>{shopName}</h2>

        {/* Category Tabs */}
        <div className={styles.tabs}>
          {Object.entries(TYPE_ICONS).map(([type, icon]) => (
            <button
              key={type}
              onClick={() => setActiveType(type as ContentType)}
              className={`${styles.tabButton} ${
                activeType === type ? styles.tabButtonActive : ""
              }`}
              title={type}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Shop Items */}
        <div className={styles.itemList}>
          {filteredStock.length === 0 ? (
            <p>No {activeType.toLowerCase()}s for sale.</p>
          ) : (
            filteredStock.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`${styles.item} ${
                  player.inventory.includes(item.id) ? styles.itemOwned : ""
                }`}
              >
                <span>{item.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    buyItem(item.id);
                  }}
                  disabled={player.inventory.includes(item.id)}
                  className={styles.buyButton}
                >
                  {player.inventory.includes(item.id) ? "Owned" : "Buy"}
                </button>
              </div>
            ))
          )}
        </div>

        <button onClick={onExit} className={styles.leaveButton}>
          Leave Shop
        </button>
      </div>

      {/* Right: Item Details */}
      <ItemDetails item={selectedItem} />
    </div>
  );
}
