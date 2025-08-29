import { useState } from "react";
import { calculateStats } from "../utils/stats";
import type { CombatEnemy } from "../data/enemies";
import StatBar from "./StatBar";

type Props = {
  enemy: CombatEnemy;
};

export default function EnemyPanel({ enemy }: Props) {
  const [showStats, setShowStats] = useState(false);
  const stats = calculateStats({ level: enemy.level, stats: enemy.stats });

  return (
    <div
      style={{
        border: "2px solid red",
        padding: "1rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <h2 style={{ margin: 0 }}>{enemy.name}</h2>
        <p style={{ margin: 0 }}>Level {enemy.level}</p>
      </div>

      {/* Toggleable stats (core + derived) */}
      {showStats && (
        <div style={{ textAlign: "right", marginBottom: "1rem" }}>
          <h3 style={{ margin: "0.25rem 0" }}>Core Stats</h3>
          <p>STR: {enemy.stats.STR}</p>
          <p>DEX: {enemy.stats.DEX}</p>
          <p>INT: {enemy.stats.INT}</p>
          <p>END: {enemy.stats.END}</p>
          <p>CHA: {enemy.stats.CHA}</p>
          <p>LUK: {enemy.stats.LUK}</p>

          <h3 style={{ margin: "0.25rem 0" }}>Derived Stats</h3>
          <p>Attack: {stats.attack}</p>
          <p>Defense: {stats.defense}</p>
          <p>Accuracy: {stats.accuracy.toFixed(1)}%</p>
          <p>Crit: {stats.critChance.toFixed(1)}%</p>
          <p>Pet Power: {stats.petPower}</p>
        </div>
      )}

      {/* Bottom: bars + portrait */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "auto",
          flexShrink: 0,
        }}
      >
        {/* Bars on left, mirrored alignment */}
        <div style={{ width: "150px", textAlign: "right" }}>
          <StatBar
            label="HP"
            current={enemy.currentHp}
            max={stats.hp}
            color="red"
            align="right"
          />
          <StatBar
            label="MP"
            current={enemy.currentMp}
            max={stats.mp}
            color="blue"
            align="right"
          />
          <StatBar
            label="SP"
            current={enemy.currentSp}
            max={stats.sp}
            color="green"
            align="right"
          />
        </div>

        {/* Portrait (click to toggle stats) */}
        <div
          onClick={() => setShowStats((prev) => !prev)}
          title="Click to view enemy stats"
          style={{
            width: "100px",
            height: "100px",
            border: "2px solid black",
            borderRadius: "50%",
            background: "url('/enemy-placeholder.png') center/cover no-repeat",
            cursor: "pointer",
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
}
