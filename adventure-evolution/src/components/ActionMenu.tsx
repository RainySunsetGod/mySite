import { useState } from "react";
import { getContent } from "../data/library";
import type { Player } from "../state/player";
import type { ContentItem } from "../data/library/types";

type Props = {
    player: Player;
    onUse: (item: ContentItem) => void;
};

export default function ActionMenu({ player, onUse }: Props) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const categories = ["Attack", "Spells", "Weapons", "Shields", "Armor", "Pets", "Misc", "Run"];

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            {/* Main vertical action bar */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    width: "120px",
                }}
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Render sub-panel only when active */}
            {activeCategory && activeCategory !== "Attack" && activeCategory !== "Run" && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "130px",
                        border: "1px solid gray",
                        padding: "0.5rem",
                        background: "#fafafa",
                        minWidth: "150px",
                        animation: "slideIn 0.3s ease-out forwards",
                    }}
                >
                    <h4 style={{ margin: "0 0 0.5rem" }}>{activeCategory}</h4>
                    {player.gearView[activeCategory as keyof typeof player.gearView].map((id) => {
                        const item = getContent(id);
                        if (!item) return null;
                        return (
                            <button
                                key={id}
                                onClick={() => {
                                    onUse(item);
                                    setActiveCategory(null);
                                }}
                                style={{ display: "block", margin: "0.25rem 0", width: "100%" }}
                            >
                                {item.name}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => setActiveCategory(null)}
                        style={{ marginTop: "0.5rem", width: "100%" }}
                    >
                        Close
                    </button>
                </div>
            )}

            {/* Inline CSS for slide animation */}
            <style>
                {`
          @keyframes slideIn {
            from {
              transform: translateX(-20%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
            </style>
        </div>
    );
}
