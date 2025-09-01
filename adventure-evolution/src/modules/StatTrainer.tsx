// src/modules/StatTrainer.tsx
import { useState } from "react";
import type { Player, CoreStats } from "../state/player";
import { allocatePlayerStats } from "../utils/statTrainer";
import { saveProgress } from "../utils/game";

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

    return (
        <div style={{ textAlign: "center", paddingTop: "2rem" }}>
            <h2>Stat Trainer</h2>
            <p>Unspent Points: {pointsLeft}</p>

            {Object.entries(allocation).map(([key, value]) => (
                <div key={key}>
                    {key}: {player.stats[key as keyof Player["stats"]]} + {value}
                    <button onClick={() => adjustStat(key as keyof CoreStats, 1)}>+</button>
                    <button onClick={() => adjustStat(key as keyof CoreStats, -1)}>-</button>

                </div>
            ))}

            <button disabled={pointsLeft !== 0} onClick={confirm} style={{ marginTop: "1rem" }}>
                Confirm Allocation
            </button>
            <button onClick={onExit} style={{ marginLeft: "1rem" }}>
                Cancel
            </button>
        </div>
    );
}
