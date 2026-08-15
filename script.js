(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const topbar = document.getElementById("topbar");
  const chips = [...document.querySelectorAll(".chips a")];
  const sections = [...document.querySelectorAll("[data-section], #visit")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onScroll = () => {
    topbar.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const dietButtons = [...document.querySelectorAll(".diet-btn")];
  const dishes = [...document.querySelectorAll(".dish, .momo")];
  const cards = [...document.querySelectorAll("[data-section]")];

  const applyDiet = (diet) => {
    dishes.forEach((row) => {
      const match = diet === "all" || row.dataset.diet === diet;
      row.classList.toggle("is-hidden", !match);
    });
    cards.forEach((card) => {
      const visible = [...card.querySelectorAll(".dish, .momo")].some(
        (row) => !row.classList.contains("is-hidden")
      );
      card.classList.toggle("is-empty", !visible);
    });
  };

  dietButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      dietButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyDiet(btn.dataset.diet);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        chips.forEach((chip) => {
          chip.classList.toggle("is-active", chip.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));

  if (reduceMotion) return;

  const canvas = document.getElementById("embers");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let sparks = [];
  let raf = 0;

  const resize = () => {
    width = canvas.width = window.innerWidth * devicePixelRatio;
    height = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    sparks = Array.from({ length: Math.min(48, Math.floor(window.innerWidth / 18)) }, () => spawn());
  };

  const spawn = (fromBottom = Math.random() > 0.35) => ({
    x: Math.random() * window.innerWidth,
    y: fromBottom ? window.innerHeight + Math.random() * 80 : Math.random() * window.innerHeight,
    r: Math.random() * 1.8 + 0.4,
    vy: -(Math.random() * 0.55 + 0.15),
    vx: (Math.random() - 0.5) * 0.35,
    a: Math.random() * 0.7 + 0.15,
    hue: Math.random() > 0.3 ? 22 : 38,
  });

  const draw = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    sparks.forEach((s, i) => {
      s.x += s.vx;
      s.y += s.vy;
      s.a -= 0.0018;
      if (s.y < -10 || s.a <= 0) sparks[i] = spawn(true);
      ctx.beginPath();
      ctx.fillStyle = `hsla(${s.hue}, 100%, 62%, ${s.a})`;
      ctx.shadowColor = `hsla(${s.hue}, 100%, 55%, 0.8)`;
      ctx.shadowBlur = 8;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", resize);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
  });
})();
