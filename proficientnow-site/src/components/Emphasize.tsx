import { Fragment } from "react";

// Turns text like "Built for *your business*" into text with the part
// between *asterisks* shown in the accent colour. Used in headlines.
export default function Emphasize({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <span key={i} className="text-accent">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
