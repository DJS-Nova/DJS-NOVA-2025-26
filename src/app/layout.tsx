import type { Metadata } from "next";
import { Gothic_A1} from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";



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
