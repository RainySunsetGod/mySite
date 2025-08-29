import type { CombatEnemy } from "../data/enemies";
import CharacterPanel from "./CharacterPanel";

export default function EnemyPanel({ enemy }: { enemy: CombatEnemy }) {
  return (
    <CharacterPanel
      entity={enemy}
      portraitUrl="/enemy-placeholder.png"
      side="right"
    />
  );
}
