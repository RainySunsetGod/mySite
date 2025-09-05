import type { Player } from "../state/player";
import { CONTENT_LIBRARY } from "../data/library";
import type { Element } from "../modules/elements";

export function calculatePlayerResistances(player: Player): Partial<Record<Element, number>> {
    // Start with nothing (defaults to 100 in UI)
    const resistances: Partial<Record<Element, number>> = {};

    // Flatten equipped gear into a single list
    const equippedIds = Object.values(player.gearView).flat();

    for (const id of equippedIds) {
        const item = CONTENT_LIBRARY[id];
        if (item?.resistances) {
            for (const [element, value] of Object.entries(item.resistances as Record<Element, number>)) {
                const el = element as Element;

                // If multiple items give resistances:
                // option A (override): last one wins
                resistances[el] = value;

                // option B (stack/multiply): uncomment if you want cumulative
                // resistances[el] = (resistances[el] ?? 100) * (value / 100);
            }
        }
    }

    return resistances;
}
