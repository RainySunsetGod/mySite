import type { Player } from "../state/player";
import { CONTENT_LIBRARY } from "../data/library";
import type { Element } from "../modules/elements";

export function calculatePlayerResistances(player: Player): Partial<Record<Element, number>> {
    // Start with 100% baseline for each element
    const resistances: Partial<Record<Element, number>> = {};

    const equippedIds = Object.values(player.gearView).flat();

    for (const id of equippedIds) {
        const item = CONTENT_LIBRARY[id];
        if (item?.resistances) {
            for (const [element, value] of Object.entries(item.resistances as Record<Element, number>)) {
                const el = element as Element;

                // Multiply stacking resistances
                const current = resistances[el] ?? 100;
                const stacked = (current * value) / 100;

                // Clamp so it can't go below 1%
                resistances[el] = Math.max(1, stacked);
            }
        }
    }

    return resistances;
}
