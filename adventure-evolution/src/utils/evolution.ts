import { getContent } from "../data/library";
import type { ContentItem, EvolutionRequirement } from "../data/library/types";

export type EvolutionContext = {
  level: number;
  inventory: Record<string, number>; // e.g., { "misc_fire_crystal": 2 }
  merges: Record<string, number>;    // how many duplicates fused
  usage: Record<string, number>;     // how many times each spell/item used
};

/**
 * Checks if requirements for evolution are satisfied.
 */
function requirementsMet(requirements: EvolutionRequirement[], context: EvolutionContext, itemId: string): boolean {
  return requirements.every((req) => {
    switch (req.type) {
      case "level":
        return context.level >= req.level;
      case "merge":
        return (context.merges[itemId] || 0) >= req.count;
      case "material":
        return (context.inventory[req.itemId] || 0) >= req.amount;
      case "usage":
        return (context.usage[itemId] || 0) >= req.uses;
      default:
        return false;
    }
  });
}

/**
 * Try to evolve a given item based on current context.
 */
export function tryEvolve(item: ContentItem, context: EvolutionContext): ContentItem {
  if (!item.evolution) return item;

  if (requirementsMet(item.evolution.requirements, context, item.id)) {
    const next = getContent(item.evolution.next);
    if (next) return next;
  }
  return item;
}
