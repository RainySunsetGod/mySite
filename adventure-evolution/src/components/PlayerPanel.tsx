import type { Player } from "../state/player";
import CharacterPanel from "./CharacterPanel";

export default function PlayerPanel({ player }: { player: Player }) {
  return (
    <CharacterPanel
      entity={player}
      portraitUrl="/player-placeholder.png"
      side="left"
    />
  );
}
