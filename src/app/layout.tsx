import type { Metadata } from "next";
import { Gothic_A1, Poppins, Roboto, Bokor, } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import IntroOverlay from "@/components/IntroOverlay";
import Footer from "@/components/Footer";



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
        <div className="relative bg-[url('/bg/space_bg.gif')] bg-auto bg-repeat bg-left-top overflow-hidden ">
        {/* <IntroOverlay /> */}
        <Navbar />
        <div className="mt-[56px]">
          {children}
        </div>
      <Footer />
        </div>
      </body>
    </html>
  );
}
