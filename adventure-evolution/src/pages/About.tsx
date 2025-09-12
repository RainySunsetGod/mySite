// src/pages/About.tsx
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 className="neon-flicker">About NeonQuest</h1>
      <p style={{ maxWidth: "600px", margin: "1rem auto", lineHeight: 1.5 }}>
        NeonQuest is a cyber-fantasy RPG inspired by turn-based browser games like AQ,
        combining high fantasy with neon-lit sci-fi elements. Built with React + TypeScript.
      </p>

      <Link to="/" style={{ color: "#00ffee", textDecoration: "underline" }}>
        ← Return to Game
      </Link>
    </div>
  );
}
