import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Snowflake, Clock, Leaf } from "lucide-react"

interface Advantage {
  icon: React.ElementType
  title: string
  description: string
}

const advantages: Advantage[] = [
  {
    icon: Snowflake,
    title: "Frozen & Fresh",
    description: "Dikemas beku untuk menjaga kesegaran dan kualitas rasa singkong keju.",
  },
  {
    icon: Clock,
    title: "Praktis & Cepat",
    description: "Siap goreng kapan saja, cocok untuk cemilan instan atau hidangan dadakan.",
  },
  {
    icon: CheckCircle,
    title: "Rasa Autentik",
    description: "Resep turun-temurun Mbah Wiryo, menjamin rasa gurih dan renyah yang khas.",
  },
  {
    icon: Leaf,
    title: "Bahan Pilihan",
    description: "Terbuat dari singkong pilihan dan keju berkualitas tinggi.",
  },
]

export default function ProductAdvantages() {
  return (
    <section id="advantages" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Keunggulan Produk Kami</h2>
          <p className="text-amber-700 text-lg">Mengapa Singkong Keju Mbah Wiryo adalah pilihan terbaik Anda?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <CardHeader className="flex flex-col items-center p-6 pb-0">
                <div className="bg-yellow-100 p-4 rounded-full mb-4">
                  <advantage.icon className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-amber-900 text-xl mb-2">{advantage.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-amber-700">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
