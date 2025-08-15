import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface Testimonial {
  name: string
  title: string
  quote: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: "Budi Santoso",
    title: "Pengusaha Kuliner",
    quote: "Singkong Keju Mbah Wiryo sangat praktis dan rasanya konsisten. Pelanggan saya suka sekali!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Siti Aminah",
    title: "Ibu Rumah Tangga",
    quote: "Anak-anak di rumah selalu minta Singkong Keju Mbah Wiryo. Cemilan sehat dan enak!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Joko Susilo",
    title: "Pecinta Kuliner",
    quote: "Teksturnya renyah di luar, lembut di dalam. Keju dan singkongnya pas banget!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

// Generate a simple blur data URL for placeholder
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stopColor="#f6f7f8" offset="20%" />
      <stop stopColor="#edeef1" offset="50%" />
      <stop stopColor="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlinkHref="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str)

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Apa Kata Mereka?</h2>
          <p className="text-amber-700 text-lg">Testimoni dari pelanggan setia Mbah Wiryo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <p className="text-amber-800 text-lg italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={`${testimonial.name} avatar`}
                      fill
                      className="rounded-full object-cover"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(48, 48))}`}
                      loading="lazy"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-amber-900 text-lg">{testimonial.name}</CardTitle>
                    <p className="text-amber-600 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
