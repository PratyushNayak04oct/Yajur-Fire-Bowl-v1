import { Cinzel, Cormorant_Garamond, Outfit } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-cinzel" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
});

export const metadata = {
  metadataBase: new URL("https://yajur-fire-bowl.vercel.app"),
  title: site.name,
  description: `${site.name} — ${site.tagline.join(", ")}. View our menu, hours, address and contact details.`,
  applicationName: site.name,
  appleWebApp: { title: site.name, capable: true },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: site.name,
    description: `${site.tagline.join(" · ")}. Open ${site.hours}.`,
    images: ["/logo.png"],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#0c0a08",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: site.name,
              alternateName: site.hindiName,
              telephone: site.phone,
              email: site.email,
              servesCuisine: site.tagline,
              openingHours: "Mo-Su 11:00-23:00",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
