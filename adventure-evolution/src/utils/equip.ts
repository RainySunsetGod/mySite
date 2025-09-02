// utils/equip.ts
import type { Player } from "../state/player";
import { getContent } from "../data/library";
import type { ContentItem } from "../data/library/types";

export function equipItem(player: Player, itemId: string): Player {
  const item: ContentItem | undefined = getContent(itemId);
  if (!item) return player;

  const newGear = { ...player.gearView };

  switch (item.type) {
    case "Weapon":
      newGear.Weapons = [itemId];
      break;
    case "Armor":
      newGear.Armor = [itemId];
      break;
    case "Shield":
      newGear.Shields = [itemId];
      break;
    case "Pet":
      newGear.Pet = [itemId];
      break;
    case "Spell":
      if (!newGear.Spells.includes(itemId)) {
        newGear.Spells = [...newGear.Spells, itemId].slice(0, 8);
      }
      break;
    case "Misc":
      if (!newGear.Misc.includes(itemId)) {
        newGear.Misc = [...newGear.Misc, itemId].slice(0, 8);
      }
      break;
  }

  return { ...player, gearView: newGear };
}
