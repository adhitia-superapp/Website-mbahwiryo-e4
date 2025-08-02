import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react" // Import Analytics from react for client-side tracking
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Singkong Keju Frozen Mbah Wiryo - Camilan Frozen Premium Yogyakarta | Peluang Reseller Menguntungkan",
  description:
    "Singkong Keju Frozen & Kroket Ayam premium dari Sleman, Yogyakarta. Camilan frozen siap goreng dengan keju leleh asli. Peluang bisnis reseller menguntungkan, margin hingga 50%. Harga mulai Rp15.000. Hubungi 0821-4756-6278.",
  keywords: [
    // Primary Keywords
    "singkong keju frozen",
    "kroket ayam frozen",
    "camilan frozen yogyakarta",
    "frozen food sleman",
    "mbah wiryo",

    // Business Keywords
    "reseller frozen food",
    "peluang bisnis frozen food",
    "dropship camilan frozen",
    "usaha rumahan frozen food",
    "bisnis camilan frozen",

    // Location Keywords
    "frozen food yogyakarta",
    "camilan khas yogyakarta",
    "singkong keju sleman",
    "frozen food sleman yogyakarta",
    "kuliner frozen yogyakarta",

    // Product Keywords
    "singkong isi keju",
    "kroket ragout ayam",
    "camilan siap goreng",
    "frozen food premium",
    "keju leleh asli",
    "singkong premium",

    // Commercial Keywords
    "jual singkong keju frozen",
    "supplier frozen food",
    "grosir camilan frozen",
    "harga reseller frozen food",
    "bisnis frozen food menguntungkan",

    // Long-tail Keywords
    "cara jadi reseller singkong keju",
    "peluang usaha camilan frozen",
    "bisnis frozen food modal kecil",
    "singkong keju frozen enak",
    "kroket ayam frozen berkualitas",
  ],
  authors: [{ name: "Mbah Wiryo" }],
  creator: "Mbah Wiryo",
  publisher: "Mbah Wiryo",
  robots: "index, follow",

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://mbahwiryo.com",
    siteName: "Mbah Wiryo - Singkong Keju Frozen Premium",
    title: "Singkong Keju Frozen Mbah Wiryo - Camilan Premium Yogyakarta | Peluang Reseller Menguntungkan",
    description:
      "🧀 Singkong Keju Frozen & Kroket Ayam premium dari Yogyakarta! Keju leleh asli, siap goreng. Peluang bisnis reseller margin 50%. Harga mulai Rp15.000. Order: 0821-4756-6278 📱",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Singkong%20Keju%20Frozen%20Mbah%20Wiryo%20Kuning%203.jpg-TpugczoCnhdZiuGLGqnugYOrguglDt.jpeg",
        width: 1200,
        height: 630,
        alt: "Singkong Keju Frozen Mbah Wiryo - Camilan Premium dengan Keju Leleh Asli",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20mbah%20wiryo%20singkong%20keju%20frozen-gTBSLC2iCxKy9d3FkIGInTGNbZ4laQ.png",
        width: 400,
        height: 400,
        alt: "Logo Mbah Wiryo - Singkong Keju Frozen Premium",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@mbahwiryo",
    creator: "@mbahwiryo",
    title: "Singkong Keju Frozen Mbah Wiryo - Camilan Premium Yogyakarta",
    description:
      "🧀 Singkong Keju Frozen premium dari Yogyakarta! Keju leleh asli, peluang bisnis reseller menguntungkan. Margin hingga 50%. Order: 0821-4756-6278 📱",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Singkong%20Keju%20Frozen%20Mbah%20Wiryo%20Kuning%203.jpg-TpugczoCnhdZiuGLGqnugYOrguglDt.jpeg",
    ],
  },

  // Additional SEO
  category: "Food & Beverage",
  classification: "Business",

  // Verification (add your actual verification codes)
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },

  // App Links
  appLinks: {
    web: {
      url: "https://mbahwiryo.com",
    },
  },

  // Additional metadata
  other: {
    "business:contact_data:street_address": "Jl. Cangkringan, Salakan, Selomartani",
    "business:contact_data:locality": "Sleman",
    "business:contact_data:region": "Yogyakarta",
    "business:contact_data:postal_code": "55571",
    "business:contact_data:country_name": "Indonesia",
    "business:contact_data:phone_number": "+6282147566278",
    "business:contact_data:website": "https://mbahwiryo.com",

    // Product Schema
    "product:brand": "Mbah Wiryo",
    "product:availability": "in stock",
    "product:condition": "new",
    "product:price:amount": "15000",
    "product:price:currency": "IDR",
    "product:retailer_item_id": "singkong-keju-original",

    // Business Schema
    "business:hours:day": "monday,tuesday,wednesday,thursday,friday,saturday,sunday",
    "business:hours:start": "08:00",
    "business:hours:end": "20:00",

    // Social Media
    "social:instagram": "https://instagram.com/mbahwiryo.official",
    "social:shopee": "https://shopee.co.id/singkongpremium.mbahwiryo.id",
    "social:whatsapp": "https://wa.me/6282147566278",

    // Local Business
    "geo:position": "-7.7172,110.4914",
    "geo:placename": "Sleman, Yogyakarta",
    "geo:region": "ID-YO",
    ICBM: "-7.7172,110.4914",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Indonesian" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="web" />
        <meta name="rating" content="general" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://mbahwiryo.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="dns-prefetch" href="//instagram.com" />
        <link rel="dns-prefetch" href="//shopee.co.id" />

        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://mbahwiryo.com/#business",
              name: "Mbah Wiryo",
              alternateName: "Singkong Keju Frozen Mbah Wiryo",
              description:
                "Produsen singkong keju frozen dan kroket ayam premium dari Sleman, Yogyakarta. Menyediakan peluang bisnis reseller dengan margin menguntungkan.",
              url: "https://mbahwiryo.com",
              telephone: "+6282147566278",
              email: "id.mbahwiryo@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Cangkringan, Salakan, Selomartani, Kec. Kalasan",
                addressLocality: "Sleman",
                addressRegion: "Yogyakarta",
                postalCode: "55571",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -7.7172,
                longitude: 110.4914,
              },
              openingHours: "Mo-Su 08:00-20:00",
              priceRange: "Rp15.000 - Rp20.000",
              currenciesAccepted: "IDR",
              paymentAccepted: "Cash, Bank Transfer",
              areaServed: {
                "@type": "Country",
                name: "Indonesia",
              },
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: -7.7172,
                  longitude: 110.4914,
                },
                geoRadius: "1000000",
              },
              sameAs: [
                "https://instagram.com/mbahwiryo.official",
                "https://shopee.co.id/singkongpremium.mbahwiryo.id",
                "https://wa.me/6282147566278",
              ],
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20mbah%20wiryo%20singkong%20keju%20frozen-gTBSLC2iCxKy9d3FkIGInTGNbZ4laQ.png",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Singkong%20Keju%20Frozen%20Mbah%20Wiryo%20Kuning%203.jpg-TpugczoCnhdZiuGLGqnugYOrguglDt.jpeg",
            }),
          }}
        />

        {/* Structured Data - Products */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Product",
                "@id": "https://mbahwiryo.com/#singkong-keju-original",
                name: "Singkong Keju Original",
                description: "Singkong lembut isi keju leleh asli, camilan frozen siap goreng berkualitas premium",
                brand: {
                  "@type": "Brand",
                  name: "Mbah Wiryo",
                },
                manufacturer: {
                  "@type": "Organization",
                  name: "Mbah Wiryo",
                },
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Singkong%20Keju%20Frozen%20Mbah%20Wiryo%20Kuning%203.jpg-TpugczoCnhdZiuGLGqnugYOrguglDt.jpeg",
                offers: {
                  "@type": "Offer",
                  price: "15000",
                  priceCurrency: "IDR",
                  availability: "https://schema.org/InStock",
                  seller: {
                    "@type": "Organization",
                    name: "Mbah Wiryo",
                  },
                },
                category: "Frozen Food",
                productID: "singkong-keju-original",
              },
              {
                "@context": "https://schema.org",
                "@type": "Product",
                "@id": "https://mbahwiryo.com/#kroket-ragout-ayam",
                name: "Kroket Ragout Ayam",
                description: "Kroket isi ragout ayam creamy & gurih. Renyah di luar, creamy di dalam",
                brand: {
                  "@type": "Brand",
                  name: "Mbah Wiryo",
                },
                manufacturer: {
                  "@type": "Organization",
                  name: "Mbah Wiryo",
                },
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kroket%20frozen%20Mbah%20wiryo%201.jpg-UDwDI2RHrV5LSZJGAToiRBHbIVhXel.jpeg",
                offers: {
                  "@type": "Offer",
                  price: "20000",
                  priceCurrency: "IDR",
                  availability: "https://schema.org/InStock",
                  seller: {
                    "@type": "Organization",
                    name: "Mbah Wiryo",
                  },
                },
                category: "Frozen Food",
                productID: "kroket-ragout-ayam",
              },
            ]),
          }}
        />

        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://mbahwiryo.com/#website",
              url: "https://mbahwiryo.com",
              name: "Mbah Wiryo - Singkong Keju Frozen Premium",
              description:
                "Website resmi Mbah Wiryo, produsen singkong keju frozen dan kroket ayam premium dari Yogyakarta dengan peluang bisnis reseller menguntungkan.",
              publisher: {
                "@type": "Organization",
                name: "Mbah Wiryo",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://mbahwiryo.com/?s={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://mbahwiryo.com/#organization",
              name: "Mbah Wiryo",
              alternateName: "Singkong Keju Frozen Mbah Wiryo",
              url: "https://mbahwiryo.com",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20mbah%20wiryo%20singkong%20keju%20frozen-gTBSLC2iCxKy9d3FkIGInTGNbZ4laQ.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+6282147566278",
                contactType: "customer service",
                availableLanguage: "Indonesian",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Cangkringan, Salakan, Selomartani, Kec. Kalasan",
                addressLocality: "Sleman",
                addressRegion: "Yogyakarta",
                postalCode: "55571",
                addressCountry: "ID",
              },
              sameAs: [
                "https://instagram.com/mbahwiryo.official",
                "https://shopee.co.id/singkongpremium.mbahwiryo.id",
                "https://wa.me/6282147566278",
              ],
            }),
          }}
        />
      </head>
      <body>
        <Suspense fallback={null}>{children}</Suspense>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
