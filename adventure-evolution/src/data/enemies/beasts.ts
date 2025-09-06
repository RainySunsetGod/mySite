import type { EnemyTemplate } from "./types";

export const BEASTS: EnemyTemplate[] = [
    {
        id: "wolf",
        name: "Wolf",
        element: "Earth",
        resistances: { Fire: 150, Ice: 80 },
        levels: [
            { level: 5, stats: { STR: 6, DEX: 5, INT: 1, END: 4, CHA: 2, LUK: 2 }, gold: 10, experience: 15 },
            { level: 10, stats: { STR: 12, DEX: 9, INT: 2, END: 8, CHA: 3, LUK: 4 }, gold: 25, experience: 40 },
            { level: 18, stats: { STR: 20, DEX: 14, INT: 3, END: 12, CHA: 5, LUK: 5 }, gold: 50, experience: 80 },
            { level: 25, stats: { STR: 28, DEX: 18, INT: 4, END: 18, CHA: 6, LUK: 7 }, gold: 80, experience: 120 },
            { level: 30, stats: { STR: 30, DEX: 20, INT: 5, END: 20, CHA: 7, LUK: 8 }, gold: 100, experience: 160 },
            { level: 35, stats: { STR: 35, DEX: 22, INT: 6, END: 22, CHA: 8, LUK: 9 }, gold: 130, experience: 200 },
            { level: 40, stats: { STR: 40, DEX: 25, INT: 7, END: 25, CHA: 10, LUK: 10 }, gold: 160, experience: 250 },
            { level: 45, stats: { STR: 45, DEX: 28, INT: 8, END: 28, CHA: 12, LUK: 12 }, gold: 200, experience: 300 },
            { level: 50, stats: { STR: 50, DEX: 30, INT: 10, END: 30, CHA: 15, LUK: 15 }, gold: 250, experience: 400 },
            { level: 55, stats: { STR: 55, DEX: 32, INT: 12, END: 32, CHA: 18, LUK: 18 }, gold: 300, experience: 500 },
            { level: 60, stats: { STR: 60, DEX: 35, INT: 15, END: 35, CHA: 20, LUK: 20 }, gold: 350, experience: 600 },
        ],
    },
    {
        id: "wolf1",
        name: "Hungry Wolf",
        element: "Earth",
        resistances: { Fire: 150, Ice: 80 },
        levels: [
            { level: 15, stats: { STR: 12, DEX: 9, INT: 2, END: 8, CHA: 3, LUK: 4 }, gold: 25, experience: 40 },
            { level: 23, stats: { STR: 20, DEX: 14, INT: 3, END: 12, CHA: 5, LUK: 5 }, gold: 50, experience: 80 },
            { level: 27, stats: { STR: 28, DEX: 18, INT: 4, END: 18, CHA: 6, LUK: 7 }, gold: 80, experience: 120 },
        ],
    },
    {
        id: "wolf2",
        name: "Ravenous Wolf",
        element: "Earth",
        resistances: { Fire: 150, Ice: 80 },
        levels: [
            { level: 25, stats: { STR: 6, DEX: 5, INT: 1, END: 4, CHA: 2, LUK: 2 }, gold: 10, experience: 15 },
            { level: 30, stats: { STR: 12, DEX: 9, INT: 2, END: 8, CHA: 3, LUK: 4 }, gold: 25, experience: 40 },
            { level: 35, stats: { STR: 20, DEX: 14, INT: 3, END: 12, CHA: 5, LUK: 5 }, gold: 50, experience: 80 },
            { level: 40, stats: { STR: 28, DEX: 18, INT: 4, END: 18, CHA: 6, LUK: 7 }, gold: 80, experience: 120 },
        ],
    },
];
