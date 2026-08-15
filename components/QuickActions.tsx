import { mapsUrl, site } from "@/lib/site";

export default function QuickActions() {
  return (
    <nav className="quick-actions" aria-label="Quick actions">
      <a className="qa-btn" href={`tel:${site.phone}`}>
        <PhoneIcon />
        <span>Call</span>
      </a>
      <a className="qa-btn qa-main" href="#menu">
        <MenuIcon />
        <span>Menu</span>
      </a>
      <a className="qa-btn" href={mapsUrl()} target="_blank" rel="noreferrer">
        <PinIcon />
        <span>Maps</span>
      </a>
    </nav>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C12.4 21 3 11.6 3 1c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}
