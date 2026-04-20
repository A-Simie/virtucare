import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VirtuCare | Medical Booking Portal",
  description: "Advanced healthcare appointment booking system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232dd4bf' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M22 12h-4l-3 9L9 3l-3 9H2'></path></svg>"
        />
      </head>
      <body className="bg-[#f8fafc] text-[#0f172a]">

        <div className="flex flex-col lg:flex-row min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 w-full max-w-[1600px] mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>

  );
}

