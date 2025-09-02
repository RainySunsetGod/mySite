import { useState } from "react";
import type { Player } from "../state/player";
import type { ContentItem, ContentType, Skill } from "../data/library/types";
import { getContent } from "../data/library";
import { equipItem } from "../utils/equip";

type Props = {
  player: Player;
  top8: Record<ContentType, ContentItem[]>; 
  onUse: (item: { id: string; name: string }) => void;
  onEquip: (updated: Player) => void;
  runCost?: number;
  equippedArmorId?: string;
};

export default function ActionMenu({
  player,
  top8,
  onUse,
  onEquip,
  runCost,
  equippedArmorId,
}: Props) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const buttonStyle: React.CSSProperties = {
    width: "120px",
    padding: "0.5rem",
    textAlign: "center",
    boxSizing: "border-box",
  };

  const armorItem = equippedArmorId ? getContent(equippedArmorId) : null;
  const armorSkills: Skill[] = armorItem?.skills ?? [];

  const MENU_LABELS: Record<ContentType, string> = {
    Weapon: "Weapons",
    Armor: "Armor",
    Shield: "Shields",
    Spell: "Spells",
    Pet: "Pet",
    Misc: "Misc",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "flex-start",
      }}
    >
      {/* Attack */}
      <button
        style={buttonStyle}
        onClick={() => onUse({ id: "attack-basic", name: "Attack" })}
      >
        Attack
      </button>

      {/* Skills (armor-dependent) */}
      <div style={{ position: "relative", display: "flex" }}>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: armorSkills.length > 0 ? "#eee" : "#666",
            cursor: armorSkills.length > 0 ? "pointer" : "not-allowed",
          }}
          disabled={armorSkills.length === 0}
          onClick={() => armorSkills.length > 0 && toggleMenu("Skills")}
        >
          Skills
        </button>
        {activeMenu === "Skills" && (
          <div
            style={{
              position: "absolute",
              left: "100%",
              top: 0,
              background: "white",
              border: "1px solid black",
              padding: "0.5rem",
              minWidth: buttonStyle.width,
            }}
          >
            {armorSkills.map((skill) => (
              <button
                key={skill.id}
                style={{ ...buttonStyle, marginBottom: "0.25rem" }}
                onClick={() => onUse(skill)}
              >
                {skill.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Gear categories */}
      {(Object.entries(MENU_LABELS) as [ContentType, string][]).map(
        ([type, label]) => (
          <div key={label} style={{ position: "relative", display: "flex" }}>
            <button style={buttonStyle} onClick={() => toggleMenu(label)}>
              {label}
            </button>

            <div
              style={{
                position: "absolute",
                left: "100%",
                top: 0,
                background: "white",
                border: "1px solid black",
                padding: "0.5rem",
                minWidth: buttonStyle.width,
                boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
                transform:
                  activeMenu === label ? "translateX(0)" : "translateX(-10px)",
                opacity: activeMenu === label ? 1 : 0,
                transition: "all 0.2s ease",
                pointerEvents: activeMenu === label ? "auto" : "none",
              }}
            >
              {top8[type].length === 0 && (
                <div style={{ color: "#666", fontSize: "0.85rem" }}>Empty</div>
              )}

              {top8[type].map((item) => {
                const isEquippable =
                  type === "Weapon" ||
                  type === "Armor" ||
                  type === "Shield" ||
                  type === "Pet";

                return (
                  <button
                    key={item.id}
                    style={{ ...buttonStyle, marginBottom: "0.25rem" }}
                    onClick={() => {
                      if (isEquippable) {
                        const updated = equipItem(player, item.id);
                        onEquip(updated);
                      } else {
                        onUse(item);
                      }
                    }}
                  >
                    {item.name}
                    {isEquippable &&
                      ((type === "Weapon" && player.gearView.Weapons[0] === item.id) ||
                        (type === "Armor" && player.gearView.Armor[0] === item.id) ||
                        (type === "Shield" && player.gearView.Shields[0] === item.id) ||
                        (type === "Pet" && player.gearView.Pet[0] === item.id)) &&
                      " (Equipped)"}
                  </button>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* Run */}
      <div style={{ position: "relative", display: "flex" }}>
        <button style={buttonStyle} onClick={() => toggleMenu("Run")}>
          Run
        </button>
        {activeMenu === "Run" && (
          <div
            style={{
              position: "absolute",
              left: "100%",
              top: 0,
              background: "white",
              border: "1px solid black",
              padding: "0.5rem",
              minWidth: buttonStyle.width,
            }}
          >
            <button
              style={buttonStyle}
              onClick={() => onUse({ id: "run", name: "Run" })}
            >
              Confirm Run {runCost ? `(Cost: ${runCost} SP)` : ""}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
