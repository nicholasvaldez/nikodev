import type { Metadata } from "next"
import { Montserrat, Merriweather } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const Monserrat_init = Montserrat({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-montserrat",
})

const Merriweather_init = Merriweather({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${Monserrat_init.variable} ${Merriweather_init.variable} bg-zinc-900 text-white`}
    >
      <body className="max-w-2xl mx-auto py-10 px-4">
      <Link href="/">
        <h1 className="text-3xl font-bold font-montserrat bg-gradient-to-r from-blue-500  to-sky-200 text-transparent bg-clip-text inline-block">
            NeekoDev<span className="text-5xl">.</span>
          </h1>
      </Link>
        {children}</body>
    </html>
  )
}
