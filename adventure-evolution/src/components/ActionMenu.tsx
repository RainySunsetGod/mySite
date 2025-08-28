import { useState } from "react";
import { getContent } from "../data/library/index";
import type { Player } from "../state/player";
import type { ContentItem } from "../data/library/types";

type Props = {
    player: Player;
    onUse: (item: ContentItem) => void;
};

export default function ActionMenu({ player, onUse }: Props) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const categories = ["Attack", "Weapons", "Armor", "Shields", "Pet", "Spells", "Misc", "Run"];

    return (
        <div style={{ display: "flex", gap: "2rem", marginTop: "1rem", justifyContent: "center" }}>
            {/* Main Menu */}
            <div>
                <h3>Actions</h3>
                {categories.map((cat) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)}>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Category Panel */}
            {activeCategory && activeCategory !== "Attack" && activeCategory !== "Run" && (
                <div className="side-panel open" style={{ padding: "1rem", border: "1px solid gray" }}>
                    <h4>{activeCategory}</h4>
                    {player.gearView[activeCategory as keyof typeof player.gearView].map((id) => {
                        const item = getContent(id);
                        if (!item) return null;
                        return (
                            <button key={id} onClick={() => onUse(item)}>
                                {item.name}
                            </button>
                        );
                    })}
                    <button onClick={() => setActiveCategory(null)}>Close</button>
                </div>
            )}
        </div>
    );
}
