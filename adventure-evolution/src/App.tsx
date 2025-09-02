import { useState } from "react";
import { DEFAULT_PLAYER, type Player } from "./state/player";
import PlayerPanel from "./components/PlayerPanel";
import EnemyPanel from "./components/EnemyPanel";
import Combat from "./modules/Combat";
import Landing from "./modules/Landing";
import Shop from "./modules/Shop";
import CharacterCreation from "./modules/CharacterCreation";
import StatTrainer from "./modules/StatTrainer";
import InventoryScreen from "./components/Inventory"; // ✅ NEW

import { ENEMIES, type EnemyTemplate, type CombatEnemy } from "./data/enemies";
import { calculateStats } from "./utils/stats";
import { loadProgress, saveProgress } from "./utils/game";

// Example shop stock
const WEAPON_SHOP = ["sword_iron", "sword_steel"];

function spawnEnemy(): CombatEnemy {
  const base: EnemyTemplate = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
  const derived = calculateStats({ level: base.level, stats: base.stats });

  return {
    ...base,
    currentHp: derived.hp,
    currentMp: derived.mp,
    currentSp: derived.sp,
  };
}

export default function App() {
  const [player, setPlayer] = useState<Player>(() => {
    const saved = loadProgress();
    if (saved) {
      return {
        ...saved,
        currentHp: saved.maxHp, // always heal HP
        currentMp: saved.maxMp, // always heal MP
        currentSp: 0,           // reset SP
      };
    }
    return DEFAULT_PLAYER;
  });

  const [enemy, setEnemy] = useState<CombatEnemy>(spawnEnemy());
  const [mode, setMode] = useState<
    "creation" | "landing" | "combat" | "shop" | "trainer" | "inventory"
  >(loadProgress() ? "landing" : "creation");

  const saveAndSetPlayer: React.Dispatch<React.SetStateAction<Player>> = (
    update
  ) => {
    setPlayer((prev) => {
      const newPlayer =
        typeof update === "function"
          ? (update as (prev: Player) => Player)(prev)
          : update;
      saveProgress(newPlayer);
      return newPlayer;
    });
  };

  const enterCombat = () => {
    setEnemy(spawnEnemy());
    setMode("combat");
  };

  const handleCreate = (newPlayer: Player) => {
    saveProgress(newPlayer);
    setPlayer(newPlayer);
    setMode("landing");
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {mode === "creation" && <CharacterCreation onCreate={handleCreate} />}

      {mode === "landing" && (
        <Landing
          player={player}
          setPlayer={saveAndSetPlayer}
          onEnterCombat={enterCombat}
          onEnterShop={() => setMode("shop")}
          onEnterTrainer={() => setMode("trainer")}
          onEnterInventory={() => setMode("inventory")} // ✅ added
        />
      )}

      {mode === "combat" && (
        <Combat
          player={player}
          setPlayer={saveAndSetPlayer}
          enemy={enemy}
          setEnemy={setEnemy}
          onExitCombat={() => setMode("landing")}
        />
      )}

      {mode === "shop" && (
        <Shop
          player={player}
          setPlayer={saveAndSetPlayer}
          shopName="Weapon Shop"
          stock={WEAPON_SHOP}
          onExit={() => setMode("landing")}
        />
      )}

      {mode === "trainer" && (
        <StatTrainer
          player={player}
          setPlayer={saveAndSetPlayer}
          onExit={() => setMode("landing")}
        />
      )}

      {mode === "inventory" && (
        <InventoryScreen
          player={player}
          setPlayer={saveAndSetPlayer} // ✅ REQUIRED
          onClose={() => setMode("landing")}
        />
      )}


      {/* Overlay Panels */}
      {mode !== "creation" && (
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0 }}>
          <PlayerPanel player={player} />
        </div>
      )}
      {mode === "combat" && (
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0 }}>
          <EnemyPanel enemy={enemy} />
        </div>
      )}
    </div>
  );
}
