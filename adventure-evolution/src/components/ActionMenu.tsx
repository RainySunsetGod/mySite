import { useState } from "react";
import type { Player } from "../state/player";
import type { ContentItem, ContentType, Skill } from "../data/library/types";
import { getContent } from "../data/library";
import { equipItem } from "../utils/equip";
import ItemDetails from "./ItemDetails";
import styles from "./ActionMenu.module.css";

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
  const [hoveredItem, setHoveredItem] = useState<ContentItem | null>(null);

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
    setHoveredItem(null);
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
    <div className={styles.menuWrapper}>
      <div className={styles.buttonColumn}>
        {/* Attack */}
        <button
          className={styles.actionButton}
          onClick={() => onUse({ id: "attack-basic", name: "Attack" })}
        >
          Attack
        </button>

        {/* Skills */}
        <div style={{ position: "relative", display: "flex" }}>
          <button
            className={`${styles.actionButton} ${armorSkills.length === 0 ? styles.disabledButton : ""
              }`}
            disabled={armorSkills.length === 0}
            onClick={() => armorSkills.length > 0 && toggleMenu("Skills")}
          >
            Skills
          </button>
          {activeMenu === "Skills" && (
            <div className={styles.dropdownContainer}>
              {armorSkills.map((skill) => (
                <button
                  key={skill.id}
                  className={styles.actionButton}
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
              <button
                className={styles.actionButton}
                onClick={() => toggleMenu(label)}
              >
                {label}
              </button>

              <div
                className={styles.dropdownContainer}
                style={{
                  transform: activeMenu === label ? "translateX(0)" : "translateX(-10px)",
                  opacity: activeMenu === label ? 1 : 0,
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

                  const isEquipped =
                    (type === "Weapon" && player.gearView.Weapons[0] === item.id) ||
                    (type === "Armor" && player.gearView.Armor[0] === item.id) ||
                    (type === "Shield" && player.gearView.Shields[0] === item.id) ||
                    (type === "Pet" && player.gearView.Pet[0] === item.id);

                  return (
                    <button
                      key={item.id}
                      className={styles.actionButton}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
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
                      {isEquipped && <span className={styles.equipped}> (Equipped)</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )
        )}

        {/* Run */}
        <div style={{ position: "relative", display: "flex" }}>
          <button className={styles.actionButton} onClick={() => toggleMenu("Run")}>
            Run
          </button>
          {activeMenu === "Run" && (
            <div className={styles.dropdownContainer}>
              <button
                className={styles.actionButton}
                onClick={() => onUse({ id: "run", name: "Run" })}
              >
                Confirm Run {runCost ? `(Cost: ${runCost} SP)` : ""}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ItemDetails Preview */}
      {hoveredItem && (
        <div
          style={{
            position: "absolute",
            left: "230%",
            top: 0,
            width: "350px",
            zIndex: 10,
          }}
        >
          <ItemDetails item={hoveredItem} />
        </div>
      )}
    </div>
  );
}
