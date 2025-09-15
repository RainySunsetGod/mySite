// src/data/map.ts
export type MapLocation = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
};

export const MAP_LOCATIONS: MapLocation[] = [
  { id: "town", name: "Town Center", description: "Your starting hub.", unlocked: true },
  { id: "forest", name: "Whispering Woods", description: "Mysterious forest full of monsters.", unlocked: true },
  { id: "chapel", name: "Chapel of Neddicus", description: "The holy grounds of the Neighborly Inquisitor.", unlocked: false }
];
