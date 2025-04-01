import { Geist } from "next/font/google";
import "./globals.css";
import QueryProvider from "./_components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
