import { useState } from "react";
import StatBar from "./StatBar";

type Enemy = {
  name: string;
  currentHp: number;
  currentMp: number;
  currentSp: number;
  maxHp: number;
  maxMp: number;
  maxSp: number;
  attack: number;
  defense: number;
};

type Props = { enemy: Enemy };

export default function EnemyPanel({ enemy }: Props) {
  const [showStats, setShowStats] = useState(false);

  return (
    <div
      style={{
        border: "2px solid red",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Middle (optional stats) */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {showStats && (
          <div style={{ textAlign: "right" }}>
            <h3>{enemy.name} Stats</h3>
            <p>Attack: {enemy.attack}</p>
            <p>Defense: {enemy.defense}</p>
          </div>
        )}
      </div>

      {/* Bottom section: bars on left, portrait on right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          flexShrink: 0,
        }}
      >
        {/* Bars stacked left, text aligned right */}
        <div style={{ width: "150px", textAlign: "right" }}>
          <StatBar
            label="HP"
            current={enemy.currentHp}
            max={enemy.maxHp}
            color="red"
            align="right"
          />
          <StatBar
            label="MP"
            current={enemy.currentMp}
            max={enemy.maxMp}
            color="blue"
            align="right"
          />
          <StatBar
            label="SP"
            current={enemy.currentSp}
            max={enemy.maxSp}
            color="green"
            align="right"
          />
        </div>

        {/* Portrait */}
        <div
          onClick={() => setShowStats((prev) => !prev)}
          style={{
            width: "100px",
            height: "100px",
            border: "2px solid black",
            borderRadius: "50%",
            background: "url('/enemy-placeholder.png') center/cover no-repeat",
            cursor: "pointer",
          }}
          title="Click to view stats"
        />
      </div>
    </div>
  );
}
