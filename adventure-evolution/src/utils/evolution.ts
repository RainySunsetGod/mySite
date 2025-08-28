import { getContent } from "../data/library/index";
import type { ContentItem } from "../data/library/types";

export function tryEvolve(item: ContentItem, level: number): ContentItem {
  if (item.evolvesAt && item.nextEvolution && level >= item.evolvesAt) {
    const next = getContent(item.nextEvolution);
    if (next) return next;
  }
  return item;
}
