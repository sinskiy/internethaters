import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./reset.css";
import "./globals.css";
import { Suspense } from "react";
import { UserAuth } from "./components/user";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}

function Header() {
  return (
    <header>
      <Suspense fallback="loading...">
        <UserAuth />
      </Suspense>
    </header>
  );
}
