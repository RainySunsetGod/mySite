import { useState } from "react";
import type { Player } from "../state/player";
import type { CombatEnemy } from "../data/enemies";
import ActionMenu from "../components/ActionMenu";
import { calculateStats } from "../utils/stats";

type Turn = "player" | "enemy";

type Props = {
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>; // ✅ proper setter type
  enemy: CombatEnemy;
  setEnemy: React.Dispatch<React.SetStateAction<CombatEnemy>>; // ✅ same for enemy
  onExitCombat: () => void;
};

export default function Combat({
  player,
  setPlayer,
  enemy,
  setEnemy,
  onExitCombat,
}: Props) {
  const [turn, setTurn] = useState<Turn>("player");
  const [log, setLog] = useState<string[]>([]);
  const [battleOver, setBattleOver] = useState(false);

  const enemyStats = calculateStats({ level: enemy.level, stats: enemy.stats });
  const playerStats = calculateStats({ level: player.level, stats: player.stats });

  const runCost = Math.ceil(enemy.level * 2 + enemy.stats.DEX);

  const pushLog = (msg: string) =>
    setLog((prev) => [...prev, msg].slice(-5));

  const regenSp = () => {
    setPlayer((prev) => {
      const spRegen = 2 + Math.floor(prev.stats.END / 5);
      const maxSp = calculateStats(prev).sp;
      const newSp = Math.min(prev.currentSp + spRegen, maxSp);

      if (newSp !== prev.currentSp) {
        pushLog(`You regained ${newSp - prev.currentSp} SP.`);
        return { ...prev, currentSp: newSp };
      }
      return prev;
    });
  };

  const playerAttack = () => {
    if (turn !== "player" || battleOver) return;

    const damage = Math.max(1, playerStats.attack - enemyStats.defense);
    const newEnemyHp = Math.max(0, enemy.currentHp - damage);

    setEnemy((prev) => ({ ...prev, currentHp: newEnemyHp }));
    pushLog(`You attack the ${enemy.name} for ${damage} damage!`);

    if (newEnemyHp <= 0) {
      pushLog(`You defeated the ${enemy.name}!`);
      setBattleOver(true);
      return;
    }

    setTurn("enemy");
    setTimeout(enemyTurn, 1000);
  };

  const enemyTurn = () => {
    if (battleOver) return;

    const damage = Math.max(1, enemyStats.attack - playerStats.defense);
    const newHp = Math.max(0, player.currentHp - damage);

    setPlayer((prev) => ({ ...prev, currentHp: newHp }));
    pushLog(`${enemy.name} hits you for ${damage} damage!`);

    if (newHp <= 0) {
      pushLog(`You were defeated by the ${enemy.name}...`);
      setBattleOver(true);
      return;
    }

    // 🔹 End of round: regen after both acted
    regenSp();

    setTurn("player");
  };

  const handleRun = () => {
    if (player.currentSp < runCost) {
      pushLog(
        `Not enough SP to run! Need ${runCost}, you have ${player.currentSp}.`
      );
      return;
    }

    setPlayer((prev) => ({ ...prev, currentSp: prev.currentSp - runCost }));
    pushLog(`You spend ${runCost} SP and escape from battle!`);
    setBattleOver(true);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "url('/battlefield-placeholder.png') center/cover no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "2rem",
      }}
    >
      {!battleOver && turn === "player" ? (
        <ActionMenu
          player={player}
          runCost={runCost}
          onUse={(item) => {
            if (item.id === "attack-basic") {
              playerAttack();
            } else if (item.id === "run") {
              handleRun();
            } else {
              pushLog(`You used ${item.name}, but nothing happened yet.`);
            }
          }}
        />
      ) : !battleOver ? (
        <p style={{ background: "rgba(255,255,255,0.7)", padding: "0.5rem" }}>
          Enemy is taking their turn...
        </p>
      ) : (
        <button onClick={onExitCombat}>Return to Town</button>
      )}

      {/* Combat log */}
      <div
        style={{
          marginTop: "1rem",
          width: "50%",
          minHeight: "5rem",
          border: "1px solid #ccc",
          padding: "0.5rem",
          fontSize: "0.9rem",
          background: "rgba(255,255,255,0.8)",
        }}
      >
        {log.map((entry, i) => (
          <div key={i}>{entry}</div>
        ))}
      </div>
    </div>
  );
}
