import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/lib/lenis";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "@/components/animations/LoadingScreen";
import CustomCursor from "@/components/animations/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "BOOST | Immunity Gummy Vitamins",
  description: "Because being sick sucks.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
