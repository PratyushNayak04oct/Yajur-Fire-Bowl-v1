"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import BackgroundFX from "@/components/BackgroundFX";
import QuickActions from "@/components/QuickActions";
import { menu, menuNav, type Diet, type Dish, type MenuSection } from "@/lib/menu";
import { mapsUrl, site } from "@/lib/site";

type DietFilter = "all" | Diet;

export default function HomePage() {
  const [diet, setDiet] = useState<DietFilter>("all");
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("soups");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-section]")];
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

  return (
    <>
      <BackgroundFX />
      <a className="skip" href="#menu">
        Skip to menu
      </a>

      <div className={`chrome${scrolled ? " is-scrolled" : ""}`}>
        <header className="topbar">
          <a className="brand" href="#top">
            <Image src="/logo.png" alt="" width={42} height={42} />
            <span>
              <strong>Yajur</strong>
              Fire Bowl
            </span>
          </a>
          <div className="diet" role="group" aria-label="Filter menu by diet">
            {(["all", "veg", "nv"] as const).map((value) => (
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

      <main>
        <Hero />
        <MenuBoard diet={diet} />
        <Visit />
      </main>

      <footer className="foot">
        <p>
          {site.name} · {site.tagline.join(" | ")}
        </p>
        <p>© {new Date().getFullYear()} {site.name}</p>
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
        <Image
          className="hero-logo"
          src="/logo.png"
          alt="Yajur Fire Bowl — Chinese, Tandoor and Momos"
          width={560}
          height={560}
          priority
        />
        <h1 className="sr-only">{site.name}</h1>
        <p className="tagline">
          {site.tagline.map((item, index) => (
            <span key={item}>
              {index > 0 && <i />}
              {item}
            </span>
          ))}
        </p>
        <p className="hours">
          {site.hoursNote} · {site.hours}
        </p>
        <div className="hero-actions">
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
    </section>
  );
}

function MenuBoard({ diet }: { diet: DietFilter }) {
  return (
    <section className="menu" id="menu">
      <header className="menu-intro">
        <p className="eyebrow">Our Menu</p>
        <h2>Flame, spice &amp; flavour</h2>
        <p>Prices in INR. Veg and non-veg marked beside each dish.</p>
      </header>
      {menu.map((section) => (
        <SectionCard key={section.id} section={section} diet={diet} />
      ))}
    </section>
  );
}

function SectionCard({ section, diet }: { section: MenuSection; diet: DietFilter }) {
  const items = useMemo(
    () => section.items.filter((item) => diet === "all" || item.diet === diet),
    [section.items, diet]
  );
  if (items.length === 0) return null;

  return (
    <article className="card" id={section.id} data-section>
      <h3 className="card-title">
        {section.title}
        <span className="diet-pair">
          {section.diets.map((value) => (
            <i key={value} className={`mark ${value}`} />
          ))}
        </span>
      </h3>
      {section.note && <p className="card-note">{section.note}</p>}
      {section.layout === "split" && (
        <div className="split-head" aria-hidden="true">
          <span />
          <span>Half</span>
          <span>Full</span>
        </div>
      )}
      {section.layout === "momo" && (
        <div className="momo-head" aria-hidden="true">
          <span>Style</span>
          <span>Steam</span>
          <span>Fried</span>
          <span>Cheese</span>
          <span>Tandoori</span>
        </div>
      )}
      <ul className={section.layout === "momo" ? "momos" : "dishes"}>
        {items.map((item) =>
          section.layout === "momo" ? (
            <MomoRow key={item.name} item={item} />
          ) : (
            <DishRow key={item.name} item={item} split={section.layout === "split"} />
          )
        )}
      </ul>
    </article>
  );
}

function DishRow({ item, split }: { item: Dish; split?: boolean }) {
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

function MomoRow({ item }: { item: Dish }) {
  const prices = item.momo;
  if (!prices) return null;
  return (
    <li className="momo">
      <span className="name">
        <i className={`mark ${item.diet}`} /> {item.name}
      </span>
      <span className={prices.steam ? undefined : "na"} data-label="Steam">
        {prices.steam ?? "—"}
      </span>
      <span data-label="Fried">{prices.fried}</span>
      <span data-label="Cheese">{prices.cheese}</span>
      <span data-label="Tandoori">{prices.tandoori}</span>
    </li>
  );
}

function Visit() {
  return (
    <section className="visit" id="visit">
      <div className="visit-card" id="address" data-section>
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
          <a className="contact" href={`tel:${site.phone}`}>
            <span>Call</span>
            <strong>{site.owner}</strong>
            <em>{site.phoneDisplay}</em>
          </a>
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
