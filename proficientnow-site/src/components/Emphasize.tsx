import { Fragment } from "react";

// Renders *asterisk-wrapped* words in the accent colour. Used in headings.
export default function Emphasize({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="accent">{part.slice(1, -1)}</span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
