import type { ContentItem } from "./types";

export const ARMORS: ContentItem[] = [
    {
        id: "armor_leather",
        name: "Leather Armor",
        type: "Armor",
        defenseBoost: 3,
    },
    {
        id: "armor_mage",
        name: "Mage Robes",
        type: "Armor",
        defenseBoost: 1,
        special: "Reduce spell cost",
    },

    // ✅ Starting class armors:
    {
        id: "armor_warrior",
        name: "Warrior Class Armor",
        type: "Armor",
        defenseBoost: 5,
        statModifiers: { STR: 2, END: 1 },
        skills: ["slash"],
        tags: ["starter", "class"],
    },
    {
        id: "armor_rogue",
        name: "Rogue Class Armor",
        type: "Armor",
        defenseBoost: 3,
        statModifiers: { DEX: 2, LUK: 1 },
        skills: ["backstab"],
        tags: ["starter", "class"],
    },
    {
        id: "armor_mage_class",
        name: "Mage Class Robes",
        type: "Armor",
        defenseBoost: 2,
        statModifiers: { INT: 3 },
        skills: ["fireball"],
        tags: ["starter", "class"],
    },
    {
        id: "armor_beastmaster",
        name: "Beastmaster Cloak",
        type: "Armor",
        defenseBoost: 2,
        statModifiers: { CHA: 2, STR: 1 },
        skills: ["pet_rally"],
        tags: ["starter", "class"],
    },
];
