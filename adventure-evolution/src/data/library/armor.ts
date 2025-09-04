import type { ContentItem } from "./types";

export const ARMORS: ContentItem[] = [
    {
        id: "armor_leather",
        name: "Leather Armor",
        type: "Armor",
    },
    {
        id: "armor_mage",
        name: "Mage Robes",
        type: "Armor",
        special: "Reduce spell cost",
        skills: [
            { id: "mage-blast", name: "Arcane Blast", description: "Deal INT-based damage" },
            { id: "mana-shield", name: "Mana Shield", description: "Reduce damage for 3 turns" },
        ],
    },

    // ✅ Starting class armors:
    {
        id: "armor_warrior",
        name: "Warrior Class Armor",
        type: "Armor",
        statModifiers: { STR: 2, END: 1 },
        skills: [],
        tags: ["starter", "class"],
    },
    {
        id: "armor_rogue",
        name: "Rogue Class Armor",
        type: "Armor",
        statModifiers: { DEX: 2, LUK: 1 },
        skills: [],
        tags: ["starter", "class"],
    },
    {
        id: "armor_mage_class",
        name: "Mage Class Robes",
        type: "Armor",
        statModifiers: { INT: 3 },
        skills: [],
        tags: ["starter", "class"],
    },
    {
        id: "armor_beastmaster",
        name: "Beastmaster Cloak",
        type: "Armor",
        statModifiers: { CHA: 2, STR: 1 },
        skills: [],
        tags: ["starter", "class"],
        resistances: { Fire: 50, Ice: 50 },
    },
];
