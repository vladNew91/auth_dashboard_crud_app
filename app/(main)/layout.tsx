import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toast";
import "./../globals.css";
import { BreadcrumbComponent } from "@/components/Breadcrumb";

const appName = "Auth CRUD Dashboard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: appName,
  description: "Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <Toaster />
        <Header appName={appName} />
        <BreadcrumbComponent />
        <main className="m-auto flex w-full justify-center">{children}</main>
        <Footer appName={appName} />
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
