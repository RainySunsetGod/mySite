import type { ContentItem, ContentType } from "./types";
import { WEAPONS } from "./weapons";
import { SPELLS } from "./spells";
import { PETS } from "./pets";

const ALL_CONTENT: ContentItem[] = [
  ...WEAPONS,
  ...SPELLS,
  ...PETS,
];

export const CONTENT_LIBRARY: Record<string, ContentItem> = {};
ALL_CONTENT.forEach((item) => {
  CONTENT_LIBRARY[item.id] = item;
});

export function listByType(type: ContentType): ContentItem[] {
  return ALL_CONTENT.filter((item) => item.type === type);
}

export function getContent(id: string | null): ContentItem | undefined {
  if (!id) return undefined;
  return CONTENT_LIBRARY[id];
}
