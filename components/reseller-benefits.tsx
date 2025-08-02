import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Gift, Users } from "lucide-react"

interface Benefit {
  icon: React.ElementType
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: DollarSign,
    title: "Margin Keuntungan Menarik",
    description: "Dapatkan harga khusus reseller dengan potensi keuntungan yang besar.",
  },
  {
    icon: TrendingUp,
    title: "Produk Laris Manis",
    description: "Singkong Keju Mbah Wiryo sudah dikenal dan disukai banyak orang.",
  },
  {
    icon: Gift,
    title: "Dukungan Pemasaran",
    description: "Kami menyediakan materi promosi dan dukungan untuk membantu penjualan Anda.",
  },
  {
    icon: Users,
    title: "Komunitas Reseller",
    description: "Bergabunglah dengan komunitas reseller kami untuk berbagi tips dan pengalaman.",
  },
]

export default function ResellerBenefits() {
  return (
    <section id="reseller-benefits" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Keuntungan Menjadi Reseller</h2>
          <p className="text-amber-700 text-lg">Bergabunglah dengan kami dan raih kesuksesan bersama!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <CardHeader className="flex flex-col items-center p-6 pb-0">
                <div className="bg-yellow-100 p-4 rounded-full mb-4">
                  <benefit.icon className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-amber-900 text-xl mb-2">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-amber-700">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
