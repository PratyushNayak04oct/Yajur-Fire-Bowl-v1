"use client";

import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const canvasRef = useRef(null);
  const parRef = useRef(null);

  useEffect(() => {
    const layer = parRef.current;
    if (!layer) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        layer.style.transform = `translate3d(0, ${window.scrollY * 0.07}px, 0)`;
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let sparks = [];
    let raf = 0;
    let running = true;

    const spawn = (fromBottom = Math.random() > 0.3) => ({
      x: Math.random() * window.innerWidth,
      y: fromBottom ? window.innerHeight + Math.random() * 90 : Math.random() * window.innerHeight,
      r: Math.random() * 1.7 + 0.35,
      vy: -(Math.random() * 0.6 + 0.12),
      vx: (Math.random() - 0.5) * 0.32,
      a: Math.random() * 0.55 + 0.12,
      hue: Math.random() > 0.28 ? 22 : 38,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(42, Math.max(18, Math.floor(window.innerWidth / 22)));
      sparks = Array.from({ length: count }, () => spawn(false));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      sparks.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;
        s.a -= 0.0015;
        if (s.y < -12 || s.a <= 0) sparks[i] = spawn(true);
        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue}, 100%, 62%, ${s.a})`;
        ctx.shadowColor = `hsla(${s.hue}, 100%, 55%, 0.75)`;
        ctx.shadowBlur = 8;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="fx" aria-hidden="true">
      <div className="fx-par" ref={parRef}>
        <div className="fx-heat" />
        <div className="fx-orb fx-orb-a" />
        <div className="fx-orb fx-orb-b" />
        <div className="fx-orb fx-orb-c" />
        <div className="fx-ring fx-ring-l" />
        <div className="fx-ring fx-ring-r" />
      </div>
      <canvas ref={canvasRef} className="fx-embers" />
      <div className="fx-grain" />
    </div>
  );
}
