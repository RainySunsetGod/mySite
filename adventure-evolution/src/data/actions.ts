export type Action = {
    category: "Attack" | "Spells" | "Skills" | "Items" | "Weapons" | "Shields" | "Armor" | "Pets" | "Run";
    name: string;
    description: string;
    effect: () => string;
}

export const actions: Action[] = [
  {
    category: "Attack",
    name: "Basic Attack",
    description: "Strike with your equipped weapon.",
    effect: () => "You slash the enemy with your weapon!",
  },
  {
    category: "Spells",
    name: "Fireball",
    description: "Cast a blazing fireball (costs 5 MP).",
    effect: () => "🔥 You hurl a fireball at the enemy!",
  },
  {
    category: "Skills",
    name: "Power Strike",
    description: "Deal a heavy physical attack.",
    effect: () => "💥 You unleash a powerful strike!",
  },
  {
    category: "Pets",
    name: "Pet Attack",
    description: "Command your pet to attack.",
    effect: () => "🐾 Your pet bites the enemy!",
  },
  {
    category: "Items",
    name: "Health Potion",
    description: "Restore 20 HP.",
    effect: () => "🧪 You drink a health potion and regain HP!",
  },
];