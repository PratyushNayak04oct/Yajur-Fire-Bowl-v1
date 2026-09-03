"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import BackgroundFX from "@/components/BackgroundFX";
import Loader from "@/components/Loader";
import QuickActions from "@/components/QuickActions";
import { menu, menuNav, momoStyles } from "@/lib/menu";
import { mapsUrl, site } from "@/lib/site";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("soups");
  const [menuOpen, setMenuOpen] = useState(false);
  const chromeRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  const reloadHome = (event) => {
    event.preventDefault();
    closeMenu();
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    const home = `${window.location.origin}/`;
    if (window.location.pathname === "/" && !window.location.hash && !window.location.search) {
      window.location.reload();
      return;
    }
    window.location.assign(home);
  };

  useEffect(() => {
    const chrome = chromeRef.current;
    if (!chrome) return undefined;
    const syncHeight = () => {
      document.documentElement.style.setProperty("--chrome-h", `${chrome.offsetHeight}px`);
    };
    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(chrome);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const onChange = () => {
      if (media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const nodes = [...document.querySelectorAll("[data-section]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = [...document.querySelectorAll(".card, .visit-card, .hero-frame")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Loader />
      <BackgroundFX />
      <a className="skip" href="#menu">
        Skip to menu
      </a>

      <div
        ref={chromeRef}
        className={`chrome${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-menu-open" : ""}`}
      >
        <header className="topbar">
          <a className="brand" href="/" onClick={reloadHome}>
            <Image src="/logo.png" alt="" width={1024} height={1024} />
            <span>
              <strong>Yajur</strong>
              Fire Bowl
            </span>
          </a>
          <button
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-sidebar"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </header>

        <nav className="chips" aria-label="Menu sections">
          {menuNav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "is-active" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={`nav-layer${menuOpen ? " is-open" : ""}`}>
        <button className="nav-scrim" type="button" aria-label="Close menu" onClick={closeMenu} />
        <aside
          className="sidebar"
          id="site-sidebar"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <p className="sidebar-kicker">Navigate</p>
          <nav className="sidebar-nav" aria-label="Menu sections">
            {menuNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "is-active" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>

      <main>
        <Hero />
        <MenuBoard />
        <Visit />
      </main>

      <footer className="foot" id="map">
        <p className="eyebrow" data-parallax="0.14">Find us</p>
        <h2 data-parallax="0.1">Yajur Fire Bowl on the map</h2>
        <div className="map-frame">
          <iframe
            title="Yajur Fire Bowl location"
            src={site.address.embed}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p data-parallax="0.08">
          {site.name} · {site.tagline.join(" | ")}
        </p>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </footer>

      <QuickActions />
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-frame">
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
        <div className="hero-shift">
          <div data-parallax="0.4">
            <Image
              className="hero-logo"
              src="/logo.png"
              alt="Yajur Fire Bowl — Chinese, Tandoor and Momos"
              width={1024}
              height={1024}
              priority
              style={{ width: "min(70vw, 300px)", height: "auto" }}
            />
          </div>
          <h1 className="sr-only">{site.name}</h1>
          <p className="tagline" data-parallax="0.28">
            {site.tagline.map((item, index) => (
              <span key={item}>
                {index > 0 && <i />}
                {item}
              </span>
            ))}
          </p>
          <p className="hours" data-parallax="0.2">
            {site.hoursNote} · {site.hours}
          </p>
          <div className="hero-actions" data-parallax="0.12">
            <a className="btn primary" href="#menu">
              View Menu
            </a>
            <a className="btn ghost" href={`tel:${site.phone}`}>
              Call {site.owner.split(" ")[0]}
            </a>
            <a className="btn ghost" href="#address">
              Address
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuBoard() {
  return (
    <section className="menu" id="menu">
      <header className="menu-intro" data-parallax="0.26">
        <p className="eyebrow">Our Menu</p>
        <h2>Flame, spice &amp; flavour</h2>
        <p>Prices in INR. Veg and non-veg filters appear where a section has both.</p>
      </header>
      {menu.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}
    </section>
  );
}

function SectionCard({ section }) {
  const [diet, setDiet] = useState("all");
  const items = useMemo(
    () => section.items.filter((item) => diet === "all" || item.diet === diet),
    [section.items, diet]
  );

  return (
    <article className="card" id={section.id} data-section data-parallax="0.16">
      <h3 className="card-title">
        {section.title}
        <span className="diet-pair">
          {section.diets.map((value) => (
            <i key={value} className={`mark ${value}`} />
          ))}
        </span>
      </h3>
      {section.diets.length > 1 && (
        <div className="section-diet" role="group" aria-label={`Filter ${section.title}`}>
          {["all", "veg", "nv"].map((value) => (
            <button
              key={value}
              className={`diet-btn${diet === value ? " is-active" : ""}`}
              type="button"
              onClick={() => setDiet(value)}
            >
              {value === "veg" && <i className="mark veg" aria-hidden="true" />}
              {value === "nv" && <i className="mark nv" aria-hidden="true" />}
              {value === "all" ? "All" : value === "veg" ? "Veg" : "Non-Veg"}
            </button>
          ))}
        </div>
      )}
      {section.note && <p className="card-note">{section.note}</p>}
      {items.length === 0 ? (
        <p className="empty-filter">No dishes in this filter. Try All or the other diet.</p>
      ) : section.layout === "momo" ? (
        <div className="momo-scroll">
          <div className="momo-head" aria-hidden="true">
            <span>Style</span>
            {momoStyles.map((style) => (
              <span key={style.key}>{style.label}</span>
            ))}
          </div>
          <ul className="momos">
            {items.map((item) => (
              <MomoRow key={`${diet}-${item.name}`} item={item} />
            ))}
          </ul>
        </div>
      ) : (
        <>
          {section.layout === "split" && items.some((item) => item.pair) && (
            <div className="split-head" aria-hidden="true">
              <span />
              <span>Half</span>
              <span>Full</span>
            </div>
          )}
          <ul className="dishes">
            {items.map((item) => (
              <DishRow key={`${diet}-${item.name}`} item={item} split={section.layout === "split"} />
            ))}
          </ul>
        </>
      )}
    </article>
  );
}

function DishRow({ item, split }) {
  return (
    <li className={`dish${item.special ? " special" : ""}${split ? " split" : ""}`}>
      <i className={`mark ${item.diet}`} />
      <span className="name">
        {item.name}
        {item.note && (item.special ? <em>{item.note}</em> : <small>{item.note}</small>)}
      </span>
      <span className="lead" />
      {item.pair ? (
        <span className={`pair${item.pair.half ? "" : " single"}`}>
          {item.pair.half && <b data-size="Half">{item.pair.half}</b>}
          <b data-size="Full">{item.pair.full}</b>
        </span>
      ) : (
        <span className="price">{item.price}</span>
      )}
    </li>
  );
}

function MomoRow({ item }) {
  const prices = item.momo;
  if (!prices) return null;
  return (
    <li className="momo">
      <span className="name">
        <i className={`mark ${item.diet}`} /> {item.name}
      </span>
      {momoStyles.map((style) => (
        <span key={style.key} data-label={style.label}>
          {prices[style.key] ?? "—"}
        </span>
      ))}
    </li>
  );
}

function Visit() {
  return (
    <section className="visit" id="visit">
      <div className="visit-card" id="address" data-section data-parallax="0.12">
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
        <p className="eyebrow">Store Address</p>
        <h2>{site.address.name}</h2>
        <address className="address">
          {site.address.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <span>
            {site.hoursNote} · {site.hours}
          </span>
        </address>
        <div className="hero-actions visit-actions">
          <a className="btn primary" href={mapsUrl()} target="_blank" rel="noreferrer">
            Get Directions
          </a>
          <a className="btn ghost" href={`tel:${site.phone}`}>
            Call for location
          </a>
        </div>
        <p className="visit-hours">{site.partyOrders}</p>
        <div className="contacts">
          {site.phones.map((phone) => (
            <a className="contact" key={phone.tel} href={`tel:${phone.tel}`}>
              <span>Call</span>
              <strong>{site.owner}</strong>
              <em>{phone.display}</em>
            </a>
          ))}
          <a className="contact" href={`mailto:${site.email}`}>
            <span>Email</span>
            <strong>Write to us</strong>
            <em>{site.email}</em>
          </a>
        </div>
        <p className="delivery-label">Also available on</p>
        <div className="partners">
          {site.partners.map((partner) => (
            <span key={partner} className={`partner ${partner.toLowerCase()}`}>
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
