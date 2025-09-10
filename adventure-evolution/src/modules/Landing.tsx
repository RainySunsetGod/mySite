import type { Player } from "../state/player";
import { fullHeal, saveProgress } from "../utils/game";
import styles from "./Landing.module.css"; // 👈 import the styles

type Props = {
  player: Player;
  setPlayer: (p: Player) => void;
  onEnterCombat: () => void;
  onEnterShop: () => void;
  onEnterTrainer: () => void;
  onEnterInventory: () => void;
};

export default function Landing({
  player,
  setPlayer,
  onEnterCombat,
  onEnterShop,
  onEnterTrainer,
  onEnterInventory,
}: Props) {
  const handleHeal = () => {
    const healed = fullHeal(player);
    setPlayer(healed);
    saveProgress(healed);
    alert("You rested at the inn. Fully healed!");
  };

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} neon-flicker`}>Welcome to Neon Town</h2>

      <div className={styles.buttonGrid}>
        <button className={styles.actionButton} onClick={handleHeal}>
          Rest at Inn
        </button>
        <button className={styles.actionButton} onClick={onEnterShop}>
          Visit Shop
        </button>
        <button className={styles.actionButton} onClick={onEnterTrainer}>
          Visit Stat Trainer
        </button>
        <button className={styles.actionButton} onClick={onEnterCombat}>
          Random Encounter
        </button>
        <button className={styles.actionButton} onClick={onEnterInventory}>
          View Inventory
        </button>
      </div>
    </div>
  );
}
