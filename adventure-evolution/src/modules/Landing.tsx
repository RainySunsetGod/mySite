import type { Player } from "../state/player";
import { fullHeal, saveProgress } from "../utils/game";

type Props = {
  player: Player;
  setPlayer: (p: Player) => void;
  onEnterCombat: () => void;
  onEnterShop: () => void;
};

export default function Landing({ player, setPlayer, onEnterCombat, onEnterShop }: Props) {
  const handleHeal = () => {
    const healed = fullHeal(player);
    setPlayer(healed);
    saveProgress(healed);
    alert("You rested at the inn. Fully healed!");
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "2rem" }}>
      <h2>Welcome to Town</h2>

      <button onClick={handleHeal} style={{ margin: "0.5rem" }}>
        Rest at Inn
      </button>

      <button onClick={onEnterShop} style={{ margin: "0.5rem" }}>
        Visit Shop
      </button>

      <button onClick={onEnterCombat} style={{ margin: "0.5rem" }}>
        Go Adventuring
      </button>
    </div>
  );
}
