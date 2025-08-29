import { useState } from "react";
import { DEFAULT_PLAYER, type Player } from "../state/player";
import PlayerPanel from "../components/PlayerPanel";
import EnemyPanel from "../components/EnemyPanel";
import ActionMenu from "../components/ActionMenu";

const DEFAULT_ENEMY = {
    name: "Slime",
    currentHp: 40,
    currentMp: 10,
    currentSp: 20,
    maxHp: 40,
    maxMp: 10,
    maxSp: 20,
    attack: 5,
    defense: 2,
};

type Turn = "player" | "enemy";

export default function Combat() {
    const [player, setPlayer] = useState<Player>(DEFAULT_PLAYER);
    const [enemy, setEnemy] = useState(DEFAULT_ENEMY);
    const [turn, setTurn] = useState<Turn>("player");
    const [log, setLog] = useState<string[]>([]);

    const pushLog = (msg: string) =>
        setLog((prev) => [...prev, msg].slice(-5)); // keep last 5 messages

    const playerAttack = () => {
        if (turn !== "player") return;

        const damage = Math.max(1, 10 - enemy.defense); // very simple formula
        const newHp = Math.max(0, enemy.currentHp - damage);

        setEnemy({ ...enemy, currentHp: newHp });
        pushLog(`You attack the ${enemy.name} for ${damage} damage!`);

        if (newHp <= 0) {
            pushLog(`You defeated the ${enemy.name}!`);
            return;
        }

        setTurn("enemy");
        setTimeout(enemyTurn, 1000); // enemy acts after 1s delay
    };

    const enemyTurn = () => {
        const damage = Math.max(1, enemy.attack - 2); // simple defense
        const newHp = Math.max(0, player.currentHp - damage);

        setPlayer({ ...player, currentHp: newHp });
        pushLog(`${enemy.name} hits you for ${damage} damage!`);

        if (newHp <= 0) {
            pushLog(`You were defeated by the ${enemy.name}...`);
            return;
        }

        setTurn("player");
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr",
                gap: "1rem",
                height: "100vh",
            }}
        >
            {/* Left panel */}
            <PlayerPanel player={player} />

            {/* Middle (actions + log) */}
            <div
                style={{
                    border: "2px solid red",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <h1>Level {player.level} Adventurer</h1>

                {turn === "player" ? (
                    <ActionMenu
                        player={player}
                        onUse={(item) => {
                            if (item.id === "attack-basic") {
                                playerAttack();
                            } else if (item.id === "run") {
                                pushLog("You attempt to run away... (not yet implemented)");
                            } else {
                                pushLog(`You used ${item.name}, but nothing happened yet.`);
                            }
                        }}
                    />
                ) : (
                    <p>Enemy is taking their turn...</p>
                )}

                {/* Combat log */}
                <div
                    style={{
                        marginTop: "1rem",
                        width: "100%",
                        minHeight: "5rem",
                        border: "1px solid #ccc",
                        padding: "0.5rem",
                        fontSize: "0.9rem",
                        background: "#f8f8f8",
                    }}
                >
                    {log.map((entry, i) => (
                        <div key={i}>{entry}</div>
                    ))}
                </div>
            </div>

            {/* Right panel */}
            <EnemyPanel enemy={enemy} />
        </div>
    );
}
