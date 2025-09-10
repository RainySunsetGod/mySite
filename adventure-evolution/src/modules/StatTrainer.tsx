import { useState } from "react";
import type { Player, CoreStats } from "../state/player";
import { allocatePlayerStats } from "../utils/statTrainer";
import { saveProgress } from "../utils/game";
import { resetPlayerStats } from "../state/player";
import styles from "./StatTrainer.module.css"; // <-- NEW

type Props = {
    player: Player;
    setPlayer: (p: Player) => void;
    onExit: () => void;
};

export default function StatTrainer({ player, setPlayer, onExit }: Props) {
    const [allocation, setAllocation] = useState({
        STR: 0,
        DEX: 0,
        INT: 0,
        END: 0,
        CHA: 0,
        LUK: 0,
    });

    const totalAllocated = Object.values(allocation).reduce((sum, val) => sum + val, 0);
    const pointsLeft = player.unspentPoints - totalAllocated;

    const adjustStat = (key: keyof typeof allocation, delta: number) => {
        if (delta > 0 && pointsLeft <= 0) return;
        if (allocation[key] + delta < 0) return;

        setAllocation({ ...allocation, [key]: allocation[key] + delta });
    };

    const confirm = () => {
        try {
            const updated = allocatePlayerStats(player, allocation);
            setPlayer(updated);
            saveProgress(updated);
            onExit();
        } catch (err) {
            alert((err as Error).message);
        }
    };

    const handleReset = () => {
        const reset = resetPlayerStats(player);
        setPlayer(reset);
        saveProgress(reset);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Stat Trainer</h2>
            <p className={styles.pointsLeft}>Unspent Points: {pointsLeft}</p>

            {Object.entries(allocation).map(([key, value]) => (
                <div key={key} className={styles.statRow}>
                    {key}: {player.stats[key as keyof Player["stats"]]} + {value}
                    <button onClick={() => adjustStat(key as keyof CoreStats, 1)}>+</button>
                    <button onClick={() => adjustStat(key as keyof CoreStats, -1)}>-</button>
                </div>
            ))}

            <div className={styles.actions}>
                <button disabled={pointsLeft !== 0} onClick={confirm}>
                    Confirm Allocation
                </button>
                <button onClick={onExit}>
                    Cancel
                </button>
                <button onClick={handleReset} className={styles.resetButton}>
                    Reset Stats
                </button>
            </div>
        </div>
    );
}
