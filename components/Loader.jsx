"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loader() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hideAt = reduce ? 180 : 1350;
    const removeAt = reduce ? 320 : 1750;
    const hideTimer = window.setTimeout(() => setHiding(true), hideAt);
    const goneTimer = window.setTimeout(() => setGone(true), removeAt);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(goneTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`loader${hiding ? " is-done" : ""}`} aria-hidden="true">
      <div className="loader-glow" />
      <div className="loader-bowl">
        <span className="loader-ring" />
        <span className="loader-ring delay" />
        <Image src="/logo.png" alt="" width={168} height={168} priority />
      </div>
      <p>Heating the tandoor</p>
    </div>
  );
}
