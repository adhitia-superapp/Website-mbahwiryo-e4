import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Siti Aminah",
    title: "Ibu Rumah Tangga",
    quote: "Anak-anak di rumah selalu minta Singkong Keju Mbah Wiryo. Cemilan sehat dan enak!",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Joko Susilo",
    title: "Pecinta Kuliner",
    quote: "Teksturnya renyah di luar, lembut di dalam. Keju dan singkongnya pas banget!",
    avatar: "/placeholder-user.jpg",
  },
]

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
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
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
