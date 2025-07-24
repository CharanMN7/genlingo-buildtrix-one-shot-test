import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genlingo - Playful Korean Learning",
  description: "Learn Korean through playful, scenario-based lessons. Enjoy songs, dramas, and culture like a native!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-0 text-neutral-7 font-[Inter]">
        {children}
      </body>
    </html>
  );
}
