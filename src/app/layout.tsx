import type { Metadata } from "next";

import Link from "next/link";

import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Wallbit Carrito - Julian Re",
  description: "El mejor carrito de productos de todo LATAM.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="container max-w-4xl m-auto grid min-h-screen grid-rows-[auto,1fr,auto] gap-8 bg-background px-2 font-sans antialiased">
        <header className="text-xl font-bold leading-[4rem] flex justify-between items-center">
          <Link href="/">Tiendincy</Link>
          <Image src='/logo.svg' width={90} height={25} alt="Wallbit Logo" />
        </header>
        {children}
        <footer className="text-center leading-[4rem] opacity-70">Tiendincy x Wallbit</footer>
      </body>
    </html>
  );
}
