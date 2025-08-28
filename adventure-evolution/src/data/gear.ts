export type Gear = {
  id: string;
  name: string;
  type: "Weapon" | "Armor" | "Shield" | "Pet" | "Items";
  attackBoost?: number;
  defenseBoost?: number;
  special?: string; // extra flavor/effect
  
};

export const weapons: Gear[] = [
  { id: "sword1", name: "Iron Sword", type: "Weapon", attackBoost: 5 },
  { id: "staff1", name: "Mage Staff", type: "Weapon", attackBoost: 2, special: "Boosts spells" },
];

export const armors: Gear[] = [
  { id: "armor1", name: "Leather Armor", type: "Armor", defenseBoost: 3 },
  { id: "armor2", name: "Mage Robes", type: "Armor", defenseBoost: 1, special: "Reduce spell cost" },
];

export const shields: Gear[] = [
  { id: "shield1", name: "Wooden Shield", type: "Shield", defenseBoost: 2 },
  { id: "shield2", name: "Fire Shield", type: "Shield", defenseBoost: 4, special: "Blocks fire damage" },
];

export const pets: Gear[] = [
  { id: "pet1", name: "Wolf Pup", type: "Pet", attackBoost: 2 },
  { id: "pet2", name: "Baby Dragon", type: "Pet", attackBoost: 4, special: "Occasional fire breath" },
];

export const miscItems: Gear[] = [
  { id: "potion", name: "Health Potion", type: "Items", special: "Restore 20 HP" },
];
