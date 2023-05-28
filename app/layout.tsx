import Nav from "@/components/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hawar",
  description: "Developed By Hawar Hekmat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-r from-gray-50 to-white min-h-screen`}
      >
        <Providers>
          <Nav />
          <main>
            <div className="container mx-auto px-24">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
