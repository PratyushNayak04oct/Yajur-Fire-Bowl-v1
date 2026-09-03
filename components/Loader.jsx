"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const LINES = ["Lighting the tandoor", "Heating the wok", "Plating your menu"];

export default function Loader() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hideAt = reduce ? 200 : 2800;
    const removeAt = reduce ? 400 : 3400;
    const hideTimer = window.setTimeout(() => setHiding(true), hideAt);
    const goneTimer = window.setTimeout(() => setGone(true), removeAt);
    const cycle = reduce
      ? undefined
      : window.setInterval(() => setLine((n) => (n + 1) % LINES.length), 850);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(goneTimer);
      if (cycle) window.clearInterval(cycle);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`loader${hiding ? " is-done" : ""}`} aria-hidden="true">
      <div className="loader-heat" />
      <span className="loader-spark s1" />
      <span className="loader-spark s2" />
      <span className="loader-spark s3" />
      <span className="loader-spark s4" />
      <span className="loader-spark s5" />
      <span className="loader-spark s6" />
      <div className="loader-scene">
        <span className="loader-ring outer" />
        <span className="loader-ring inner" />
        <span className="loader-glow" />
        <div className="loader-brand">
          <Image
            src="/logo.png"
            alt=""
            width={1024}
            height={1024}
            priority
            style={{ width: "100%", height: "auto" }}
          />
          <span className="loader-sheen" />
        </div>
      </div>
      <p suppressHydrationWarning>{LINES[line]}</p>
      <div className="loader-bar" />
    </div>
  );
}
