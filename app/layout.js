"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "./_components/QueryProvider";

const poppinsSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppinsSans.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
