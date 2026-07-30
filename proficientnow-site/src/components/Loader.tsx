"use client";

import { useEffect, useState } from "react";

// Full-screen intro loader: centred brand mark + slim bar, then zooms out.
export default function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 13 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        setTimeout(() => setDone(true), 450);
      }
      setPct(Math.floor(p));
    }, 130);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="loader" className={done ? "done" : ""}>
      <div className="load-inner">
        <div className="favmark">P</div>
        <div className="load-track">
          <div className="load-fill" style={{ width: pct + "%" }} />
        </div>
        <div className="load-pct">{pct}%</div>
      </div>
    </div>
  );
}
