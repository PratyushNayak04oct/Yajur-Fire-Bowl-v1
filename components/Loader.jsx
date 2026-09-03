"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const LINES = ["Lighting the tandoor", "Tossing the wok", "Steaming the momos", "Plating your menu"];

export default function Loader() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hideAt = reduce ? 200 : 3200;
    const removeAt = reduce ? 360 : 3800;
    const hideTimer = window.setTimeout(() => setHiding(true), hideAt);
    const goneTimer = window.setTimeout(() => setGone(true), removeAt);
    const cycle = reduce
      ? undefined
      : window.setInterval(() => setLine((n) => (n + 1) % LINES.length), 800);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(goneTimer);
      if (cycle) window.clearInterval(cycle);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`loader${hiding ? " is-done" : ""}`} aria-hidden="true">
      <div className="loader-scene">
        <div className="loader-steam" />
        <div className="loader-steam s2" />
        <div className="loader-steam s3" />
        <span className="food-mote chili a" />
        <span className="food-mote momo b" />
        <span className="food-mote leaf c" />
        <span className="food-mote chili d" />
        <span className="food-mote spark e" />
        <span className="food-mote momo f" />
        <span className="food-mote leaf g" />
        <span className="food-mote spark h" />
        <div className="loader-glow" />
        <div className="loader-bowl">
          <span className="loader-flame f1" />
          <span className="loader-flame f2" />
          <span className="loader-flame f3" />
          <span className="loader-ring" />
          <span className="loader-ring delay" />
          <Image src="/logo.png" alt="" width={168} height={168} priority />
        </div>
        <span className="loader-wok" />
        <span className="loader-coals" />
      </div>
      <p suppressHydrationWarning>{LINES[line]}</p>
      <div className="loader-bar" />
    </div>
  );
}
