import type { Metadata } from "next";
import { Gothic_A1, Poppins, Roboto, Bokor } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import IntroOverlay from "@/components/IntroOverlay";
import Footer from "@/components/Footer";
import FallingStars from "@/components/FallingStars";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import LayoutFix from "@/components/ScrollToTopOnNavigate";

// const bokor = Bokor({
//   weight: ["400"],
//   subsets: ["latin"],
// });

// const roboto = Roboto({
//   weight: ["400", "600", "700"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-roboto",
// });

// const poppins = Poppins({
//   weight: ["400", "600", "700"],
//   subsets: ["latin"],
// });

const gothicA1 = Gothic_A1({
  variable: "--font-gothic-a1",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // choose weights you need
});

export const metadata: Metadata = {
  title: "DJS Nova",
  description: "DJS Nova - Exploring the Cosmos, One Star at a Time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gothicA1.className}  antialiased`}>
        <body>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </body>
      </body>
    </html>
  );
}
