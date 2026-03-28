import Link from "next/link";
import styles from "./OtherTools.module.css";

const ALL_TOOLS = [
  {
    id: "learnlooper",
    href: "/tools/learnlooper",
    title: "LearnLooper",
    description: "Pomodoro timer + YouTube AB loop. Boost your study sessions.",
    accentColor: "#2196f3",
  },
  {
    id: "abloop",
    href: "/tools/abloop",
    title: "AB Loop",
    description: "Loop any section of a YouTube video for practice.",
    accentColor: "orange",
  },
  {
    id: "audioloop",
    href: "/tools/audioloop",
    title: "Audio Loop Tool",
    description: "Upload MP3 files and loop them with ease.",
    accentColor: "rgb(187, 104, 187)",
  },
  {
    id: "displaylock",
    href: "/tools/displaylock",
    title: "Display Lock",
    description: "Stay focused by preventing tab switching during study.",
    accentColor: "#22c55e",
  },
];

export default function OtherTools({ currentTool }) {
  const tools = ALL_TOOLS.filter((t) => t.id !== currentTool);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Try Other Tools</h2>
      <div className={styles.grid}>
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className={styles.card}
            style={{ borderTopColor: tool.accentColor }}
          >
            <h3 className={styles.cardTitle} style={{ color: tool.accentColor }}>
              {tool.title}
            </h3>
            <p className={styles.cardDescription}>{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
