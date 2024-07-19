import type { Metadata } from "next";
// import { Yeseva_One } from 'next/font/google'
import "./globals.css";
import 'animate.css';
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";


export const metadata: Metadata = {
  title: "Poly Observer",
  description: "Owned by Poly Observer",
  icons:'/logo.png'
};

// const yeseva_one = Yeseva_One({
//   weight:'400',
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-yeseva_one',
// })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` `}>
        <Navbar />
        <div className="md:mt-16 w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
