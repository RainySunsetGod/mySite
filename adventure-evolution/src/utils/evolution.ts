import { creatures} from "../data/creatures";
import type { Creature } from "../data/creatures";

export function tryEvolve(creature: Creature): Creature {
  if (creature.evolvesAt && creature.level >= creature.evolvesAt) {
    const next = creatures[creature.nextEvolution!];
    return { ...next, level: creature.level }; // keep the same level
  }
  return creature;
}
