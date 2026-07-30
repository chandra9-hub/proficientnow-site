"use client";

import { useEffect, useRef } from "react";

// A small rich-text box: bold, italic, bullet and numbered lists.
// Stores the content as HTML (rendered on the job page).
export default function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // set the starting content once
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value || "")) ref.current.innerHTML = value || "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function exec(cmd: string) {
    document.execCommand(cmd, false);
    ref.current?.focus();
    if (ref.current) onChange(ref.current.innerHTML);
  }

  const btn: React.CSSProperties = { background: "var(--card)", border: "1px solid var(--cardbd)", color: "var(--heading)", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 13 };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button type="button" style={{ ...btn, fontWeight: 700 }} onClick={() => exec("bold")}>B</button>
        <button type="button" style={{ ...btn, fontStyle: "italic" }} onClick={() => exec("italic")}>I</button>
        <button type="button" style={btn} onClick={() => exec("insertUnorderedList")}>• List</button>
        <button type="button" style={btn} onClick={() => exec("insertOrderedList")}>1. List</button>
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={() => ref.current && onChange(ref.current.innerHTML)}
        className="field rich"
        style={{ minHeight: 120, textAlign: "left", overflowY: "auto" }}
        suppressContentEditableWarning
      />
    </div>
  );
}
