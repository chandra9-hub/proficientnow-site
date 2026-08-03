"use client";
import { useEffect, useState } from "react";
export default function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1400); return () => clearTimeout(t); }, []);
  return (
    <div id="loader" className={done ? "done" : ""}>
      <img className="loadlogo lg-light" src="/brand/logo-light.png" alt="ProficientNow" />
      <img className="loadlogo lg-dark" src="/brand/logo-dark.png" alt="ProficientNow" />
    </div>
  );
}
