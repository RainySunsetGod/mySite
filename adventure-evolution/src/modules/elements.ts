// src/modules/elements.ts

// Core element union type
export type Element =
    | "Fire"
    | "Water"
    | "Ice"
    | "Energy"
    | "Light"
    | "Darkness"
    | "Wind"
    | "Earth";

// ✅ Explicitly allow use as Record key
export type ElementKey = Element & string;

export const ELEMENTS: Element[] = [
    "Fire",
    "Water",
    "Ice",
    "Energy",
    "Light",
    "Darkness",
    "Wind",
    "Earth",
];

export const ELEMENT_DETAILS: Record<Element, { label: string; color: string }> = {
    Fire: { label: "Fire", color: "#e25822" },
    Water: { label: "Water", color: "#3399ff" },
    Ice: { label: "Ice", color: "#a0e9f0" },
    Energy: { label: "Energy", color: "#ffff33" },
    Light: { label: "Light", color: "#fffdd0" },
    Darkness: { label: "Darkness", color: "#333333" },
    Wind: { label: "Wind", color: "#9dd9d2" },
    Earth: { label: "Earth", color: "#a67c52" },
};
