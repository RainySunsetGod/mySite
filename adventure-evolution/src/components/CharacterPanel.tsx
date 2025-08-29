import { useState } from "react";
import { calculateStats } from "../utils/stats";
import StatBar from "./StatBar";

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
};

type Props = {
  entity: Entity;
  portraitUrl: string;
  side: "left" | "right"; // changes alignment
};

export default function CharacterPanel({ entity, portraitUrl, side }: Props) {
  const [showStats, setShowStats] = useState(false);
  const derived = calculateStats({ level: entity.level, stats: entity.stats });

  const align = side === "left" ? "left" : "right";

  return (
    <div
      style={{
        border: "2px solid red",
        padding: "1rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        textAlign: align,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "0.5rem" }}>
        <h2 style={{ margin: 0 }}>{entity.name}</h2>
        <p style={{ margin: 0 }}>Level {entity.level}</p>
      </div>

      {/* Toggleable stats */}
      {showStats && (
        <div style={{ marginBottom: "1rem" }}>
          <h3>Core Stats</h3>
          <p>STR: {entity.stats.STR}</p>
          <p>DEX: {entity.stats.DEX}</p>
          <p>INT: {entity.stats.INT}</p>
          <p>END: {entity.stats.END}</p>
          <p>CHA: {entity.stats.CHA}</p>
          <p>LUK: {entity.stats.LUK}</p>

          <h3>Derived Stats</h3>
          <p>Attack: {derived.attack}</p>
          <p>Defense: {derived.defense}</p>
          <p>Accuracy: {derived.accuracy.toFixed(1)}%</p>
          <p>Crit: {derived.critChance.toFixed(1)}%</p>
          <p>Pet Power: {derived.petPower}</p>
        </div>
      )}

      {/* Bars + portrait */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: side === "left" ? "flex-start" : "flex-end",
          gap: "1rem",
          marginTop: "auto",
        }}
      >
        {/* Bars */}
        <div style={{ width: "150px", textAlign: align }}>
          <StatBar
            label="HP"
            current={entity.currentHp}
            max={derived.hp}
            color="red"
            align={side}
          />
          <StatBar
            label="MP"
            current={entity.currentMp}
            max={derived.mp}
            color="blue"
            align={side}
          />
          <StatBar
            label="SP"
            current={entity.currentSp}
            max={derived.sp}
            color="green"
            align={side}
          />
        </div>

        {/* Portrait */}
        <div
          onClick={() => setShowStats((prev) => !prev)}
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
      </div>
    </div>
  );
}
