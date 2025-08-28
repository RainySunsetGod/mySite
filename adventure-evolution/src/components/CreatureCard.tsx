import type { Creature } from "../data/creatures";

type Props = {
  creature: Creature;
  onLevelUp?: () => void;
};

export default function CreatureCard({ creature, onLevelUp }: Props) {
  return (
    <div style={{ border: "2px solid black", padding: "1rem", margin: "1rem auto", width: "200px" }}>
      <h2>{creature.name}</h2>
      <p>Level: {creature.level}</p>
      <p>HP: {creature.maxHP}</p>
      <p>Attack: {creature.attack}</p>
      {onLevelUp && (
        <button onClick={onLevelUp} style={{ marginTop: "1rem" }}>
          Level Up
        </button>
      )}
    </div>
  );
}
