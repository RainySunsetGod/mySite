import type { Player } from "../state/player";
import { getContent } from "../data/library";

type Props = {
  player: Player;
  onClose: () => void;
};

export default function InventoryScreen({ player, onClose }: Props) {
  const items = player.inventory.map(getContent).filter(Boolean);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Your Inventory</h2>

      {items.length === 0 ? (
        <p>Your bag is empty.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => (
            <li key={item!.id} style={{ margin: "0.5rem 0" }}>
              <strong>{item!.name}</strong> ({item!.type})
              {item?.special && (
                <div style={{ fontSize: "0.8rem", color: "gray" }}>
                  {item.special}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <button onClick={onClose} style={{ marginTop: "1rem" }}>
        Close
      </button>
    </div>
  );
}
