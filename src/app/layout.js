import localFont from "next/font/local";
import "./globals.css";
import { NavbarMain } from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});


export const metadata = {
  title: "Musify",
  description: "Musify is a platform for discovering and enjoying music",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-zinc-900`}
      >
      <NavbarMain className=" bg-slate-600"/>
      <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
