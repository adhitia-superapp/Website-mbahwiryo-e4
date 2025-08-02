import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mbah Wiryo - Singkong Keju & Kroket Ayam Frozen Premium | Peluang Reseller",
  description:
    "Mbah Wiryo menyediakan Singkong Keju Frozen dan Kroket Ayam Frozen premium, camilan khas Indonesia siap goreng yang praktis dan lezat. Temukan peluang reseller menarik di Sleman, Yogyakarta. Kunjungi Shopee kami atau hubungi via WhatsApp untuk informasi lebih lanjut.",
  keywords: [
    "singkong keju frozen",
    "kroket ayam frozen",
    "frozen food",
    "camilan khas Indonesia",
    "makanan beku",
    "reseller frozen food",
    "peluang usaha",
    "Mbah Wiryo",
    "Sleman",
    "Yogyakarta",
    "kuliner Jogja",
    "jajanan praktis",
    "siap goreng",
    "makanan instan",
    "cemilan keluarga",
    "shopee mbah wiryo",
  ],
  authors: [{ name: "Mbah Wiryo" }],
  openGraph: {
    title: "Mbah Wiryo - Singkong Keju & Kroket Ayam Frozen Premium | Peluang Reseller",
    description:
      "Mbah Wiryo menyediakan Singkong Keju Frozen dan Kroket Ayam Frozen premium, camilan khas Indonesia siap goreng yang praktis dan lezat. Temukan peluang reseller menarik di Sleman, Yogyakarta. Kunjungi Shopee kami atau hubungi via WhatsApp untuk informasi lebih lanjut.",
    url: "https://mbahwiryo.com", // Ganti dengan URL website Anda yang sebenarnya
    siteName: "Mbah Wiryo",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product%20singkong%20keju%20Frozen%20mbah%20wiryo-egS2886Ffu7F5ycAr62K7yGp0MnITB.jpeg", // Gambar Singkong Keju Frozen
        width: 1200,
        height: 630,
        alt: "Singkong Keju Frozen Mbah Wiryo",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kroket%20frozen%20Mbah%20wiryo%201.jpg-wkS9BN3v58mh4ikEZZbbbT7ur9Hwqj.jpeg", // Gambar Kroket Ayam Frozen
        width: 1200,
        height: 630,
        alt: "Kroket Ayam Frozen Mbah Wiryo",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20mbah%20wiryo%20singkong%20keju%20frozen-ID7fybBH6fmSXvyiFQ6Ba9FOLTp6jF.png", // Logo Mbah Wiryo
        width: 200,
        height: 200,
        alt: "Logo Mbah Wiryo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mbah Wiryo - Singkong Keju & Kroket Ayam Frozen Premium | Peluang Reseller",
    description:
      "Mbah Wiryo menyediakan Singkong Keju Frozen dan Kroket Ayam Frozen premium, camilan khas Indonesia siap goreng yang praktis dan lezat. Temukan peluang reseller menarik di Sleman, Yogyakarta. Kunjungi Shopee kami atau hubungi via WhatsApp untuk informasi lebih lanjut.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product%20singkong%20keju%20Frozen%20mbah%20wiryo-egS2886Ffu7F5ycAr62K7yGp0MnITB.jpeg",
    ], // Gambar Singkong Keju Frozen
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
