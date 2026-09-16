import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Morrow — Objects with a story",
  description: "A considered collection of small-batch pieces, made slowly and meant to last.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f1eee8] text-[#22313a] antialiased">{children}</body>
    </html>
  );
}
