import { useState } from "react";
import type { Player } from "../state/player";
import { getContent } from "../data/library";

type Props = {
  player: Player;
  onUse: (item: { id: string; name: string }) => void;
};

export default function ActionMenu({ player, onUse }: Props) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const buttonStyle: React.CSSProperties = {
    width: "120px", // ✅ consistent button width
    padding: "0.5rem",
    textAlign: "center",
    boxSizing: "border-box",
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
      {/* Attack as a special action */}
      <button style={buttonStyle} onClick={() => onUse({ id: "attack-basic", name: "Attack" })}>
        Attack
      </button>

      {/* Gear categories */}
      {["Weapons", "Armor", "Shields", "Spells", "Pet", "Misc"].map((menu) => (
        <div
          key={menu}
          style={{
            position: "relative",
            display: "flex",
          }}
        >
          <button style={buttonStyle} onClick={() => toggleMenu(menu)}>
            {menu}
          </button>

          {/* Sliding submenu */}
          <div
            style={{
              position: "absolute",
              left: "100%",
              top: 0,
              background: "white",
              border: "1px solid black",
              padding: "0.5rem",
              minWidth: buttonStyle.width, // ✅ match width of main button
              boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",

              // Animation
              transform: activeMenu === menu ? "translateX(0)" : "translateX(-10px)",
              opacity: activeMenu === menu ? 1 : 0,
              transition: "all 0.2s ease",
              pointerEvents: activeMenu === menu ? "auto" : "none",
            }}
          >
            {player.gearView[menu as keyof typeof player.gearView].length === 0 && (
              <div style={{ color: "#666", fontSize: "0.85rem", textAlign: "center" }}>Empty</div>
            )}
            {player.gearView[menu as keyof typeof player.gearView].map((id) => {
              const item = getContent(id);
              if (!item) return null;
              return (
                <button
                  key={id}
                  style={{ ...buttonStyle, marginBottom: "0.25rem" }}
                  onClick={() => onUse(item)}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Run action */}
      <button style={buttonStyle} onClick={() => onUse({ id: "run", name: "Run" })}>
        Run
      </button>
    </div>
  );
}
