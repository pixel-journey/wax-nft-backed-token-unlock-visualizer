import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'A cliff, then a line',
  description: 'Linear unlock with a cliff. The schedule is an argument, not an NFT.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
