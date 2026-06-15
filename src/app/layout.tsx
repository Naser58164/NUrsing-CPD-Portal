import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CPD Nursing Portal",
  description:
    "Continuing Professional Development portal for nursing staff — track CPD hours, certifications, competencies and more.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
