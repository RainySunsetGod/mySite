import { useState } from "react";
import StatBar from "./StatBar";
import { ELEMENTS, ELEMENT_DETAILS, type Element } from "../modules/elements";
import type { Player } from "../state/player";
import { calculatePlayerResistances } from "../state/calcResistance";

type CoreStats = {
  STR: number;
  DEX: number;
  INT: number;
  END: number;
  CHA: number;
  LUK: number;
};

type Entity = {
  name: string;
  level: number;
  stats: CoreStats;
  currentHp: number;
  currentMp: number;
  currentSp: number;
  maxHp: number;
  maxMp: number;
  maxSp: number;
  gold?: number;
  experience?: number;
  resistances?: Partial<Record<Element, number>>;
  element?: Element;
};

type Props = {
  entity: Entity | Player; // can be either enemy or player
  portraitUrl: string;
  side: "left" | "right";
};

// ✅ XP threshold
function xpForNextLevel(level: number) {
  return level * 100;
}

export default function CharacterPanel({ entity, portraitUrl, side }: Props) {
  const [showStats, setShowStats] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const displayStats = showStats || isHovering;
  const isLeft = side === "left"; // left = player, right = enemy

  // ✅ If this is the player (left side), calculate resistances dynamically
  const effectiveEntity: Entity =
    isLeft && "gearView" in entity
      ? { ...entity, resistances: calculatePlayerResistances(entity as Player) }
      : entity;

  // Only show non-neutral resistances
  const shownResistances = ELEMENTS.filter((el) => {
    const value = effectiveEntity.resistances?.[el] ?? 100;
    return value !== 100;
  });

  const xpNeeded = xpForNextLevel(entity.level);

  return (
    <div
      style={{
        // border: "2px solid red",
        padding: "1rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Toggleable/Fadeable stats */}
      <div
        style={{
          marginBottom: "1rem",
          opacity: displayStats ? (showStats ? 1 : 0.8) : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: displayStats ? "auto" : "none",
          textAlign: "left",
        }}
      >
        <div style={{ marginBottom: "0.5rem" }}>
          <h2 style={{ margin: 0 }}>{entity.name}</h2>
          <p style={{ margin: 0 }}>Level {entity.level}</p>

          {/* ✅ Show inherent element if enemy */}
          {!isLeft && "element" in entity && entity.element && (
            <p style={{ margin: 0, color: ELEMENT_DETAILS[entity.element].color }}>
              Element: {ELEMENT_DETAILS[entity.element].label}
            </p>
          )}

          {/* ✅ Player: current gold + exp progress */}
          {isLeft && (
            <>
              <p style={{ margin: 0 }}>💰 Gold: {entity.gold ?? 0}</p>
              <p style={{ margin: 0 }}>
                ⭐ Experience: {entity.experience ?? 0} / {xpNeeded}
              </p>
            </>
          )}

          {/* ✅ Enemy: reward gold + exp */}
          {!isLeft &&
            (entity.gold !== undefined || entity.experience !== undefined) && (
              <>
                <p style={{ margin: 0 }}>💰 Drops: {entity.gold ?? 0} gold</p>
                <p style={{ margin: 0 }}>
                  ⭐ Gives: {entity.experience ?? 0} XP
                </p>
              </>
            )}
        </div>

        <h3>Combat Defense</h3>
        <p>Melee Defense: {entity.stats.STR}</p>
        <p>Ranged Defense: {entity.stats.DEX}</p>
        <p>Magic Defense: {entity.stats.INT}</p>

        <h3>Core Stats</h3>
        <p>STR: {entity.stats.STR}</p>
        <p>DEX: {entity.stats.DEX}</p>
        <p>INT: {entity.stats.INT}</p>
        <p>END: {entity.stats.END}</p>
        <p>CHA: {entity.stats.CHA}</p>
        <p>LUK: {entity.stats.LUK}</p>

        {/* ✅ Elemental Resistances */}
        {shownResistances.length > 0 && (
          <div style={{ marginTop: "0.5rem" }}>
            <h3>Elemental Resistances</h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.85rem",
              }}
            >
              {shownResistances.map((el) => {
                const value = effectiveEntity.resistances?.[el] ?? 100;
                return (
                  <li key={el} style={{ color: ELEMENT_DETAILS[el].color }}>
                    {ELEMENT_DETAILS[el].label}: {value}%
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Portrait + Bars */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isLeft ? "flex-start" : "flex-end",
          flexDirection: isLeft ? "row" : "row-reverse",
          gap: "1rem",
          marginTop: "auto",
        }}
      >
        {/* Portrait */}
        <div
          onClick={() => setShowStats((prev) => !prev)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          title="Click to toggle stats"
          style={{
            width: "100px",
            height: "100px",
            border: "2px solid black",
            borderRadius: "50%",
            background: `url(${portraitUrl}) center/cover no-repeat`,
            cursor: "pointer",
            flexShrink: 0,
          }}
        />

        {/* Bars (HP/MP/SP only) */}
        <div style={{ flex: 1, minWidth: "180px", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 0.5rem 0" }}>{entity.name}</h2>

          {/* HP */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.25rem",
            }}
          >
            <span
              style={{ width: "30px", textAlign: "right", marginRight: "0.5rem" }}
            >
              HP
            </span>
            <div style={{ flex: 1 }}>
              <StatBar
                current={entity.currentHp}
                max={entity.maxHp}
                color="red"
                align={isLeft ? "left" : "right"}
              />
            </div>
          </div>

          {/* MP */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.25rem",
            }}
          >
            <span
              style={{ width: "30px", textAlign: "right", marginRight: "0.5rem" }}
            >
              MP
            </span>
            <div style={{ flex: 1 }}>
              <StatBar
                current={entity.currentMp}
                max={entity.maxMp}
                color="blue"
                align={isLeft ? "left" : "right"}
              />
            </div>
          </div>

          {/* SP */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{ width: "30px", textAlign: "right", marginRight: "0.5rem" }}
            >
              SP
            </span>
            <div style={{ flex: 1 }}>
              <StatBar
                current={entity.currentSp}
                max={entity.maxSp}
                color="green"
                align={isLeft ? "left" : "right"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
