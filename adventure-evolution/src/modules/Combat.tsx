import { useState } from "react";
import type { Player } from "../state/player";
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

type Props = {
  player: Player;
  setPlayer: (p: Player) => void;
  onExitCombat: () => void;
};

export default function Combat({ player, setPlayer, onExitCombat }: Props) {
  const [enemy, setEnemy] = useState(DEFAULT_ENEMY);
  const [turn, setTurn] = useState<Turn>("player");
  const [log, setLog] = useState<string[]>([]);
  const [battleOver, setBattleOver] = useState(false);

  const pushLog = (msg: string) =>
    setLog((prev) => [...prev, msg].slice(-5));

  const playerAttack = () => {
    if (turn !== "player" || battleOver) return;

    const damage = Math.max(1, 10 - enemy.defense);
    const newHp = Math.max(0, enemy.currentHp - damage);

    setEnemy({ ...enemy, currentHp: newHp });
    pushLog(`You attack the ${enemy.name} for ${damage} damage!`);

    if (newHp <= 0) {
      pushLog(`You defeated the ${enemy.name}!`);
      setBattleOver(true);
      return;
    }

    setTurn("enemy");
    setTimeout(enemyTurn, 1000);
  };

  const enemyTurn = () => {
    if (battleOver) return;

    const damage = Math.max(1, enemy.attack - 2);
    const newHp = Math.max(0, player.currentHp - damage);

    setPlayer({ ...player, currentHp: newHp });
    pushLog(`${enemy.name} hits you for ${damage} damage!`);

    if (newHp <= 0) {
      pushLog(`You were defeated by the ${enemy.name}...`);
      setBattleOver(true);
      return;
    }

    setTurn("player");
  };

  return (
    <>
      {/* Middle panel */}
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
        <h1>Battle vs {enemy.name}</h1>

        {!battleOver && turn === "player" ? (
          <ActionMenu
            player={player}
            onUse={(item) => {
              if (item.id === "attack-basic") {
                playerAttack();
              } else if (item.id === "run") {
                pushLog("You attempt to run away...");
                setBattleOver(true);
              } else {
                pushLog(`You used ${item.name}, but nothing happened yet.`);
              }
            }}
          />
        ) : !battleOver ? (
          <p>Enemy is taking their turn...</p>
        ) : (
          <button onClick={onExitCombat}>Return to Town</button>
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
    </>
  );
}
