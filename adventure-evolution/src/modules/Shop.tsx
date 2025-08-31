import { getContent } from "../data/library";
import type { Player } from "../state/player";

type Props = {
  player: Player;
  setPlayer: (p: Player) => void;
  shopName: string;
  stock: string[]; // IDs of items
  onExit: () => void;
};

export default function Shop({ player, setPlayer, shopName, stock, onExit }: Props) {
  const buyItem = (id: string) => {
    if (player.inventory.includes(id)) {
      alert("You already own this item!");
      return;
    }
    setPlayer({ ...player, inventory: [...player.inventory, id] });
    alert(`Bought ${getContent(id)?.name}!`);
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h2>{shopName}</h2>
      {stock.map((id) => {
        const item = getContent(id);
        if (!item) return null;
        return (
          <div key={id} style={{ margin: "0.5rem" }}>
            {item.name}{" "}
            <button onClick={() => buyItem(id)}>Buy</button>
          </div>
        );
      })}

      <button onClick={onExit} style={{ marginTop: "1rem" }}>
        Leave Shop
      </button>
    </div>
  );
}
