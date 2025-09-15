// src/modules/WorldMap.tsx
import { MAP_LOCATIONS } from "../data/map";

type Props = {
  onSelect: (locationId: string) => void;
  onExit: () => void;
};

export default function WorldMap({ onSelect, onExit }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">World Map</h1>
      <div className="flex flex-col gap-2">
        {MAP_LOCATIONS.map((loc) =>
          loc.unlocked ? (
            <button
              key={loc.id}
              className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-400 shadow"
              onClick={() => onSelect(loc.id)}
            >
              {loc.name}
            </button>
          ) : (
            <button
              key={loc.id}
              className="bg-gray-400 px-4 py-2 rounded cursor-not-allowed opacity-70"
              disabled
            >
              ??? (Locked)
            </button>
          )
        )}
      </div>
      <button onClick={onExit} className="mt-6 text-sm underline">
        Back
      </button>
    </div>
  );
}
