import { getContent } from "../data/library";
import type { Player } from "../state/player";
import type { ContentItem, ContentType } from "../data/library/types";

/**
 * Returns only the top 8 items from each category,
 * based on their order in the player's inventory.
 */
export function getTop8ByCategory(player: Player): Record<ContentType, ContentItem[]> {
    const fullInventory = player.inventory
        .map(getContent)
        .filter((item): item is ContentItem => item !== undefined);

    const grouped: Record<ContentType, ContentItem[]> = {
        Weapon: [],
        Armor: [],
        Shield: [],
        Pet: [],
        Spell: [],
        Misc: [],
    };

    fullInventory.forEach((item) => {
        grouped[item.type].push(item);
    });

    // Only keep the first 8 in each group
    (Object.keys(grouped) as ContentType[]).forEach((key) => {
        grouped[key] = grouped[key].slice(0, 8);
    });

    return grouped;
}
