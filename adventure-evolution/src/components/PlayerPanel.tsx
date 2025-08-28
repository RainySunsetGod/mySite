import { useState } from "react";
import StatBar from "./StatBar";
import type { Player } from "../state/player";
import { calculateStats } from "../utils/stats";

type Props = { player: Player };

export default function PlayerPanel({ player }: Props) {
    const stats = calculateStats(player);
    const [showStats, setShowStats] = useState(false);

    return (
        <div
            style={{
                border: "2px solid red",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                height: "100vh", // panel fills window height
                boxSizing: "border-box",
            }}
        >
            {/* Middle (optional stats) */}
            <div style={{ flex: 1, overflow: "hidden" }}>
                {showStats && (
                    <div style={{ textAlign: "left" }}>
                        {/* Core Stats with tooltips */}
                        <h3>Core Stats</h3>
                        <p title="Strength: increases melee damage.">STR: {player.stats.STR}</p>
                        <p title="Dexterity: improves accuracy, speed, and ranged damage.">
                            DEX: {player.stats.DEX}
                        </p>
                        <p title="Intelligence: increases magic damage and max MP.">
                            INT: {player.stats.INT}
                        </p>
                        <p title="Endurance: increases max HP and defense.">END: {player.stats.END}</p>
                        <p title="Charisma: increases pet effectiveness and guest power.">
                            CHA: {player.stats.CHA}
                        </p>
                        <p title="Luck: improves critical hit chance and initiative.">
                            LUK: {player.stats.LUK}
                        </p>

                        {/* Derived Stats with tooltips */}
                        <h3 style={{ marginTop: "1rem" }}>Derived Stats</h3>
                        <p title="Increases hit chance and damage dealt.">Attack: {stats.attack}</p>
                        <p title="Reduces enemy hit chance and damage taken.">Defense: {stats.defense}</p>
                        <p title="Base % chance to hit your target.">Accuracy: {stats.accuracy.toFixed(1)}%</p>
                        <p title="% chance to deal extra crit damage.">
                            Crit Chance: {stats.critChance.toFixed(1)}%
                        </p>
                        <p title="Multiplier for pet damage and effectiveness.">
                            Pet Power: {stats.petPower}
                        </p>
                    </div>
                )}
            </div>

            {/* Bottom section: portrait + bars side by side */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    flexShrink: 0,
                }}
            >
                {/* Portrait */}
                <div
                    onClick={() => setShowStats((prev) => !prev)}
                    style={{
                        width: "100px",
                        height: "100px",
                        border: "2px solid black",
                        borderRadius: "50%",
                        background: "url('/portrait-placeholder.png') center/cover no-repeat",
                        cursor: "pointer",
                    }}
                    title="Click to view stats"
                />

                {/* Bars stacked next to portrait */}
                <div style={{ width: "150px" }}>
                    <StatBar label="HP" current={player.currentHp} max={stats.hp} color="red" />
                    <StatBar label="MP" current={player.currentMp} max={stats.mp} color="blue" />
                    <StatBar label="SP" current={player.currentSp} max={stats.sp} color="green" />
                </div>
            </div>
        </div>
    );
}
