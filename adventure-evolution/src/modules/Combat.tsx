import { useState } from "react";
import type { Player } from "../state/player";
import type { CombatEnemy } from "../data/enemies/types";
import ActionMenu from "../components/ActionMenu";
import { calculateStats, calculateDamageOutcome } from "../utils/stats";
import { getTop8ByCategory } from "../utils/inventory";
import { getContent } from "../data/library";
import type { ContentItem } from "../data/library/types";
import type { Element } from "../modules/elements";

function checkLevelUp(player: Player): Player {
  const xpNeeded = player.level * 100;
  if (player.experience >= xpNeeded) {
    return {
      ...player,
      level: player.level + 1,
      experience: player.experience - xpNeeded,
      stats: {
        ...player.stats,
        STR: player.stats.STR + 1,
        END: player.stats.END + 1,
      },
      maxHp: player.maxHp + 10,
      currentHp: player.maxHp + 10,
      maxMp: player.maxMp + 5,
      currentMp: player.maxMp + 5,
      maxSp: player.maxSp + 5,
      currentSp: player.maxSp + 5,
    };
  }
  return player;
}

type Turn = "player" | "enemy";

type Props = {
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  enemy: CombatEnemy;
  setEnemy: React.Dispatch<React.SetStateAction<CombatEnemy>>;
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

  const runCost = Math.ceil(enemy.level * 2 + enemy.stats.DEX);
  const top8 = getTop8ByCategory(player);

  const pushLog = (msg: string) =>
    setLog((prev) => [...prev, msg].slice(-10));

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

    const weaponId = player.gearView.Weapons?.[0] ?? null;
    const playerWeapon: ContentItem | null = weaponId
      ? getContent(weaponId) || null
      : null;

    const outcome = calculateDamageOutcome(
      {
        stats: player.stats,
        level: player.level,
        weapon: playerWeapon ?? undefined,
      },
      {
        stats: enemy.stats,
        level: enemy.level,
        resistances: enemy.resistances,
      },
      playerWeapon?.attackType ?? "melee",
      playerWeapon?.element as Element | undefined // ✅ if weapon has an element
    );

    if (!outcome.hit) {
      pushLog(`You missed the ${enemy.name}!`);
    } else {
      setEnemy((prev) => ({
        ...prev,
        currentHp: Math.max(0, prev.currentHp - outcome.damage),
      }));

      if (outcome.wasCrit) {
        pushLog(`💥 Critical hit! You dealt ${outcome.damage} damage!`);
      } else {
        pushLog(`You hit the ${enemy.name} for ${outcome.damage} damage.`);
      }
    }

    pushLog(
      `🎯 Hit chance: ${outcome.hitChance.toFixed(1)}% (rolled ${outcome.roll.toFixed(1)})`
    );
    if (playerWeapon) {
      pushLog(`⚔️ Weapon: ${playerWeapon.name}`);
    }
    if (playerWeapon?.element) {
      pushLog(`🌟 Element: ${playerWeapon.element}`);
    }
    outcome.debug.forEach((d) => pushLog(`ℹ️ ${d}`));

    if (enemy.currentHp - outcome.damage <= 0) {
      pushLog(`✅ You defeated the ${enemy.name}!`);

      const goldReward = enemy.gold ?? 0;
      const xpReward = enemy.experience ?? 0;

      setPlayer((prev) => {
        const updated = {
          ...prev,
          gold: prev.gold + goldReward,
          experience: prev.experience + xpReward,
        };

        const leveled = checkLevelUp(updated);

        if (goldReward > 0) pushLog(`💰 You gained ${goldReward} gold!`);
        if (xpReward > 0) pushLog(`⭐ You gained ${xpReward} experience!`);

        if (leveled.level > prev.level) {
          pushLog(`⬆️ You leveled up to level ${leveled.level}!`);
        }

        return leveled;
      });

      setBattleOver(true);
      return;
    }

    setTurn("enemy");
    setTimeout(enemyTurn, 1000);
  };

  const enemyTurn = () => {
    if (battleOver) return;

    const attackType = enemy.attackType ?? "melee"; // ✅ support attackType
    const attackElement = enemy.element; // ✅ general element of attacks

    const outcome = calculateDamageOutcome(
      {
        stats: enemy.stats,
        level: enemy.level,
      },
      {
        stats: player.stats,
        level: player.level,
        resistances: player.resistances,
      },
      attackType,
      attackElement
    );

    if (!outcome.hit) {
      pushLog(`${enemy.name} missed!`);
    } else {
      setPlayer((prev) => ({
        ...prev,
        currentHp: Math.max(0, prev.currentHp - outcome.damage),
      }));

      if (outcome.wasCrit) {
        pushLog(
          `❗ ${enemy.name} critically hits you for ${outcome.damage} ${
            attackElement ?? ""
          } damage!`
        );
      } else {
        pushLog(
          `${enemy.name} hits you for ${outcome.damage} ${
            attackElement ?? ""
          } damage.`
        );
      }
    }

    pushLog(
      `🎯 Hit chance: ${outcome.hitChance.toFixed(1)}% (rolled ${outcome.roll.toFixed(1)})`
    );
    if (attackElement) {
      pushLog(`🌟 Element: ${attackElement}`);
    }
    outcome.debug.forEach((d) => pushLog(`ℹ️ ${d}`));

    if (player.currentHp - outcome.damage <= 0) {
      pushLog(`💀 You were defeated by the ${enemy.name}...`);
      setBattleOver(true);
      return;
    }

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
          top8={top8}
          equippedArmorId={player.gearView.Armor[0] ?? null}
          onEquip={(updated) => setPlayer(updated)}
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
