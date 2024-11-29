import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import { NavbarMain } from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import Adsense1 from "@/components/Adsense1";

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
      <AuthProvider>
    <html lang="en">
    <head>
      <Adsense1 pId="5230983184187192" />
    </head>
      <body
        className={`${poppins.className} antialiased bg-zinc-900`}
      >
      <SpeedInsights />
      <NavbarMain className=" bg-slate-600"/>
      <Toaster position="top-center" />
        {children}
        </body>
    </html>
      </AuthProvider>
  );
}
