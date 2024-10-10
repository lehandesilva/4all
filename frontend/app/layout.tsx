import type { Metadata } from "next";
import "./ui/globals.css";
import { inter } from "./ui/fonts";
import Header from "./ui/header";

export const metadata: Metadata = {
  title: "4all",
  description: "Free e-learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-p-1`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
