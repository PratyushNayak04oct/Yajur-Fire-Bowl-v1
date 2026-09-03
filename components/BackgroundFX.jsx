"use client";

import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const canvasRef = useRef(null);
  const slowRef = useRef(null);
  const midRef = useRef(null);
  const foodRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const root = document.documentElement;
    let frame = 0;
    let mouseX = 0;
    let mouseY = 0;

    const paint = () => {
      const y = window.scrollY;
      root.style.setProperty("--sy", `${y}`);
      root.style.setProperty("--mx", `${mouseX}`);
      root.style.setProperty("--my", `${mouseY}`);
      if (slowRef.current) {
        slowRef.current.style.transform = `translate3d(${mouseX * -10}px, ${y * 0.05 + mouseY * -8}px, 0)`;
      }
      if (midRef.current) {
        midRef.current.style.transform = `translate3d(${mouseX * 14}px, ${y * 0.1 + mouseY * 10}px, 0)`;
      }
      if (foodRef.current) {
        foodRef.current.style.transform = `translate3d(${mouseX * -18}px, ${y * 0.16 + mouseY * -12}px, 0)`;
      }
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(paint);
    };
    const onMove = (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
      if (frame) return;
      frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
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
      const count = Math.min(36, Math.max(16, Math.floor(window.innerWidth / 24)));
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
      <div className="fx-par slow" ref={slowRef}>
        <div className="fx-heat" />
      </div>
      <div className="fx-par mid" ref={midRef}>
        <span className="bg-steam one" />
        <span className="bg-steam two" />
        <span className="bg-steam three" />
      </div>
      <div className="fx-par food" ref={foodRef}>
        <span className="food-mote chili p1" />
        <span className="food-mote leaf p3" />
        <span className="food-mote spark p4" />
        <span className="food-mote chili p5" />
        <span className="food-mote leaf p7" />
        <span className="food-mote spark p8" />
      </div>
      <canvas ref={canvasRef} className="fx-embers" />
      <div className="fx-grain" />
    </div>
  );
}
