import type { ContentItem, ContentType } from "./types";
import { WEAPONS } from "./weapons";
import { SPELLS } from "./spells";
import { PETS } from "./pets";
import { ARMORS } from "./armor";
import { SHIELDS } from "./shields";
import { ITEMS } from "./misc";

const ALL_CONTENT: ContentItem[] = [
  ...WEAPONS,
  ...SPELLS,
  ...PETS,
  ...ARMORS,
  ...SHIELDS,
  ...ITEMS,
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

export function handleContentUse(id: string): string {
  const item = getContent(id);

  if (!item) return `Item with ID "${id}" not found.`;

  switch (item.type) {
    case "Spell":
      return `🪄 You cast ${item.name}! It deals ${item.power} damage for ${item.cost} MP.`;

    case "Weapon":
    case "Shield":
    case "Armor":
    case "Pet":
      return `🛡️ You equip the ${item.name}.`;

    case "Misc":
      return `🧪 You use the ${item.name}: ${item.special ?? "No effect."}`;

    default:
      return `Item type "${item.type}" not handled.`;
  }
}