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
  side: "left" | "right";
};

export default function CharacterPanel({ entity, portraitUrl, side }: Props) {
  const [showStats, setShowStats] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const derived = calculateStats({ level: entity.level, stats: entity.stats });
  const align = side === "left" ? "left" : "right";

  const displayStats = showStats || isHovering;

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
      {/* Toggleable/Fadeable stats */}
      <div
        style={{
          marginBottom: "1rem",
          opacity: displayStats ? (showStats ? 1 : 0.8) : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: displayStats ? "auto" : "none",
        }}
      >
        <div style={{ marginBottom: "0.5rem" }}>
          <h2 style={{ margin: 0 }}>{entity.name}</h2>
          <p style={{ margin: 0 }}>Level {entity.level}</p>
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
      </div>

      {/* Portrait + Bars */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: side === "left" ? "flex-start" : "flex-end",
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

        {/* Bars */}
        <div style={{ width: "150px", textAlign: align }}>
          <h2 style={{ margin: 0 }}>{entity.name}</h2>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "0.25rem", width: "150px" }}>
            <span style={{ width: "30px", textAlign: "right", marginRight: "0.5rem" }}>HP</span>
            <div style={{ width: "120px" }}>
              <StatBar current={entity.currentHp} max={derived.hp} color="red" />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "0.25rem", width: "150px" }}>
            <span style={{ width: "30px", textAlign: "right", marginRight: "0.5rem" }}>MP</span>
            <div style={{ width: "120px" }}>
              <StatBar current={entity.currentMp} max={derived.mp} color="blue" />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "0.25rem", width: "150px" }}>
            <span style={{ width: "30px", textAlign: "right", marginRight: "0.5rem" }}>SP</span>
            <div style={{ width: "120px" }}>
              <StatBar current={entity.currentSp} max={derived.sp} color="green" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
