import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import "./globals.css";
import ClientRoot from "./providers/ClientRoot";

// Brand display font — Tanker, a single-weight fat display face.
const tanker = localFont({
  src: "../../public/Fonts/WEB/fonts/Tanker-Regular.woff2",
  variable: "--font-tanker",
  display: "swap",
  weight: "400",
});

// Clean sans for body copy.
const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight:"400"
});

export const metadata = {
  title: "ZULA — Your Purple Coffee Ritual",
  description:
    "Halo Halo! Tell us your mood and we'll pour you the perfect ZULA drink.",
};

export const viewport = {
  themeColor: "#4A1A6B",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${tanker.variable} ${outfit.variable} h-full antialiased`}
    >
      {/* remove overflow-hidden here */}
      <body className="h-full flex flex-col">
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
