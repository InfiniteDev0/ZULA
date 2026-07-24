import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import "./globals.css";

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
      <body className="h-full overflow-hidden flex flex-col ">{children}</body>
    </html>
  );
}
