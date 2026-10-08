import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
// import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toast";
import "./../globals.css";
import { BreadcrumbComponent } from "@/components/Breadcrumb";

const appName = "Auth CRUD Dashboard";

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
    <html lang="en" className={`${GeistMono.variable} h-full antialiased`}>
      <body className="flex h-dvh flex-col">
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
