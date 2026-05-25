import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://quickprofessionalmover.com"),
  title: "Quick Professional Movers",
  description: "Quick Professional Movers provides home, villa, office moving, packing, furniture assembly, appliance installation, and handyman services in Sharjah and across the UAE.",
  keywords: ["movers in Sharjah", "UAE moving company", "villa moving", "office relocation", "packing services", "furniture assembly"],
  robots: "index, follow",
  openGraph: {
    title: "Quick Professional Movers",
    description: "Fast, careful, and reliable moving services for homes, offices, and everything in between.",
    type: "website",
    images: ["/assets/home-services/logo-transparent.webp"]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fff9fc"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          as="video"
          href="/assets/home-services/hero-mobile-background.mp4"
          type="video/mp4"
          media="(max-width: 767px), (pointer: coarse)"
        />
        <link rel="preload" as="image" href="/assets/home-services/logo-transparent.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/home-services/hero-clean-v2.webp"
          media="(max-width: 767px), (pointer: coarse)"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
