import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";

const karla = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sehat",
  description:
    "Your health, your way - harness the future of diagnostics with our symptom-driven AI disease prediction app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${karla.className} min-h-screen`}>{children}</body>
    </html>
  );
}
