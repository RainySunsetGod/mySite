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
  return (
    <div
      style={{
        border: "2px solid red",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>{enemy.name}</h2>
      <StatBar label="HP" current={enemy.currentHp} max={enemy.maxHp} color="red" />
      <StatBar label="MP" current={enemy.currentMp} max={enemy.maxMp} color="blue" />
      <StatBar label="SP" current={enemy.currentSp} max={enemy.maxSp} color="green" />
    </div>
  );
}
