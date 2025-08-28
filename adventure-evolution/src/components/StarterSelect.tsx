import { creatures} from "../data/creatures";
import type { Creature } from "../data/creatures";

type Props = {
  onChoose: (creature: Creature) => void;
};

export default function StarterSelect({ onChoose }: Props) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Choose Your Starter!</h1>
      <button onClick={() => onChoose(creatures.fireling)}>🔥 Fireling</button>
      <button onClick={() => onChoose(creatures.sprouty)}>🌱 Sprouty</button>
    </div>
  );
}
