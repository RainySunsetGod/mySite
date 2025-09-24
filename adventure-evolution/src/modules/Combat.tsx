// src/modules/Combat.tsx
import { useState } from "react";
import type { Player } from "../state/player";
import type { CombatEnemy } from "../data/enemies/types";
import ActionMenu from "../components/ActionMenu";
import { calculateStats, calculateDamageOutcome } from "../utils/stats";
import { getTop8ByCategory } from "../utils/inventory";
import { getContent } from "../data/library";
import type { ContentItem } from "../data/library/types";
import type { Element } from "../modules/elements";
import styles from "./Combat.module.css";

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
type BattleResult = "win" | "loss" | null;

type DamagePopup = {
  id: number;
  side: "player" | "enemy";
  value?: number;
  type: string;
  element?: string;
  crit?: boolean;
  miss?: boolean;
};

type Props = {
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  enemy: CombatEnemy;
  setEnemy: React.Dispatch<React.SetStateAction<CombatEnemy>>;
  onExitCombat: () => void;
};

let popupId = 0;

export default function Combat({
  player,
  setPlayer,
  enemy,
  setEnemy,
  onExitCombat,
}: Props) {
  const [turn, setTurn] = useState<Turn>("player");
  const [battleOver, setBattleOver] = useState(false);
  const [battleResult, setBattleResult] = useState<BattleResult>(null);
  const [popups, setPopups] = useState<DamagePopup[]>([]);
  const [actionLocked, setActionLocked] = useState(false);

  const runCost = Math.ceil(enemy.level * 2 + enemy.stats.DEX);
  const top8 = getTop8ByCategory(player);

  const showPopup = (
    side: "player" | "enemy",
    value?: number,
    type: string = "",
    element?: string,
    crit?: boolean,
    miss?: boolean
  ) => {
    const id = popupId++;
    setPopups((prev) => [...prev, { id, side, value, type, element, crit, miss }]);

    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 1500);
  };

  const regenSp = () => {
    setPlayer((prev) => {
      const spRegen = 2 + Math.floor(prev.stats.END / 5);
      const maxSp = calculateStats(prev).sp;
      const newSp = Math.min(prev.currentSp + spRegen, maxSp);
      return { ...prev, currentSp: newSp };
    });
  };

  const playerAttack = () => {
    if (turn !== "player" || battleOver || actionLocked) return;
    setActionLocked(true);

    const weaponId = player.gearView.Weapons?.[0] ?? null;
    const playerWeapon: ContentItem | null = weaponId
      ? getContent(weaponId) || null
      : null;

    const outcome = calculateDamageOutcome(
      {
        stats: player.stats,
        level: player.level,
        source: playerWeapon ?? undefined,
      },
      {
        stats: enemy.stats,
        level: enemy.level,
        resistances: enemy.resistances,
      },
      playerWeapon?.attackType ?? "melee",
      playerWeapon?.element as Element | undefined
    );

    if (!outcome.hit) {
      showPopup("enemy", undefined, "Miss", undefined, false, true);
    } else {
      const damage = outcome.damage;

      setEnemy((prev) => ({
        ...prev,
        currentHp: Math.max(0, prev.currentHp - damage),
      }));

      showPopup(
        "enemy",
        damage,
        playerWeapon?.attackType ?? "melee",
        playerWeapon?.element,
        outcome.wasCrit
      );

      if (enemy.currentHp - damage <= 0) {
        const goldReward = enemy.gold ?? 0;
        const xpReward = enemy.experience ?? 0;

        setPlayer((p) => {
          const updated = {
            ...p,
            gold: p.gold + goldReward,
            experience: p.experience + xpReward,
          };
          return checkLevelUp(updated);
        });

        setBattleOver(true);
        setBattleResult("win");
      }
    }

    setActionLocked(false);
    if (!battleOver) {
      setTurn("enemy");
      setTimeout(enemyTurn, 1000);
    }
  };

  const enemyTurn = () => {
    if (battleOver || actionLocked) return;
    setActionLocked(true);

    const attackType = enemy.attackType ?? "melee";
    const attackElement = enemy.element;

    const outcome = calculateDamageOutcome(
      {
        stats: enemy.stats,
        level: enemy.level,
        source: undefined,
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
      showPopup("player", undefined, "Miss", undefined, false, true);
    } else {
      const damage = outcome.damage;

      setPlayer((prev) => ({
        ...prev,
        currentHp: Math.max(0, prev.currentHp - damage),
      }));

      showPopup("player", damage, attackType, attackElement, outcome.wasCrit);

      if (player.currentHp - damage <= 0) {
        setBattleOver(true);
        setBattleResult("loss");
      }
    }

    setActionLocked(false);
    if (!battleOver) {
      regenSp();
      setTurn("player");
    }
  };

  const handleRun = () => {
    if (player.currentSp < runCost) {
      showPopup("player", 0, "Run Failed");
      return;
    }

    setPlayer((prev) => ({ ...prev, currentSp: prev.currentSp - runCost }));
    setBattleOver(true);
    setBattleResult("loss");
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
        position: "relative",
      }}
    >
      {/* Floating damage popups */}
      {popups.map((popup) => (
        <div
          key={popup.id}
          className={`${styles.damagePopup} ${styles[popup.side]} ${popup.crit ? styles.crit : ""
            } ${popup.miss ? styles.miss : ""}`}
        >
          {popup.miss ? (
            <span>Miss</span>
          ) : (
            <>
              {popup.element && (
                <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>{popup.element}</div>
              )}
              <div style={{ fontSize: "0.9rem" }}>{popup.type}</div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{popup.value}</div>
            </>
          )}
        </div>
      ))}

      {!battleOver && turn === "player" ? (
        <ActionMenu
          player={player}
          runCost={runCost}
          top8={top8}
          equippedArmorId={player.gearView.Armor[0] ?? null}
          onEquip={(updated: Player) => setPlayer(updated)}
          onUse={(item: ContentItem) => {
            if (item.id === "attack-basic") {
              playerAttack();
            } else if (item.id === "run") {
              handleRun();
            } else if (item.type === "Spell" || item.type === "Skill") {
              const costs = item.costs ?? [];

              // ✅ Check resources
              for (const c of costs) {
                if (c.type === "MP" && player.currentMp < c.amount) {
                  showPopup("player", 0, "No MP");
                  return;
                }
                if (c.type === "SP" && player.currentSp < c.amount) {
                  showPopup("player", 0, "No SP");
                  return;
                }
                if (c.type === "HP" && player.currentHp <= c.amount) {
                  showPopup("player", 0, "No HP");
                  return;
                }
              }

              // ✅ Deduct resources
              setPlayer((prev) => {
                const updated = { ...prev };
                for (const c of costs) {
                  if (c.type === "MP") updated.currentMp -= c.amount;
                  if (c.type === "SP") updated.currentSp -= c.amount;
                  if (c.type === "HP") updated.currentHp -= c.amount;
                }
                return updated;
              });

              // ✅ Damage calculation
              const outcome = calculateDamageOutcome(
                {
                  stats: player.stats,
                  level: player.level,
                  source: item, // spell/skill itself is the source
                },
                {
                  stats: enemy.stats,
                  level: enemy.level,
                  resistances: enemy.resistances,
                },
                item.attackType ?? "magic",
                item.element
              );

              if (!outcome.hit) {
                showPopup("enemy", undefined, "Miss", item.element, false, true);
              } else {
                setEnemy((prev) => ({
                  ...prev,
                  currentHp: Math.max(0, prev.currentHp - outcome.damage),
                }));

                showPopup("enemy", outcome.damage, item.type, item.element, outcome.wasCrit);

                if (enemy.currentHp - outcome.damage <= 0) {
                  const goldReward = enemy.gold ?? 0;
                  const xpReward = enemy.experience ?? 0;

                  setPlayer((p) => {
                    const updated = {
                      ...p,
                      gold: p.gold + goldReward,
                      experience: p.experience + xpReward,
                    };
                    return checkLevelUp(updated);
                  });

                  setBattleOver(true);
                  setBattleResult("win");
                  return;
                }
              }

              setTurn("enemy");
              setTimeout(enemyTurn, 1000);
            }
          }}
        />
      ) : !battleOver ? (
        <p style={{ background: "rgba(255,255,255,0.7)", padding: "0.5rem" }}>
          Enemy is taking their turn...
        </p>
      ) : (
        <button
          className={styles.returnButton}
          onClick={() => {
            const maxStats = calculateStats(player);
            let updatedPlayer: Player = player;

            if (battleResult === "loss") {
              updatedPlayer = {
                ...player,
                currentHp: maxStats.hp,
                currentMp: maxStats.mp,
                currentSp: 0,
              };
            } else if (battleResult === "win") {
              updatedPlayer = {
                ...player,
                currentHp: Math.min(player.currentHp, maxStats.hp),
                currentMp: Math.min(player.currentMp, maxStats.mp),
                currentSp: player.currentSp,
              };
            }

            setPlayer(updatedPlayer);
            onExitCombat();
          }}
        >
          Return to Town
        </button>
      )}
    </div>
  );
}
