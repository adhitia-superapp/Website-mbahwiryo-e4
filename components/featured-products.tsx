"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, ShoppingCart, Truck, Phone, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ShippingCalculator from "./shipping-calculator"
import { products } from "@/lib/products"
import { generateWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp-messages"

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

export default function FeaturedProducts() {
  const [showShippingModal, setShowShippingModal] = useState(false)
  const [shippingProduct, setShippingProduct] = useState<string>("")

  const handleOrderWhatsApp = (product: (typeof products)[0]) => {
    const message = generateWhatsAppMessage({
      productName: product.name,
      price: product.price,
      weight: product.specifications.weight,
      context: "product-list",
    })
    const whatsappUrl = getWhatsAppUrl("6282147566278", message)
    window.open(whatsappUrl, "_blank")
  }

  const handleCheckShipping = (productName: string) => {
    setShippingProduct(productName)
    setShowShippingModal(true)
  }

  const handleGeneralInquiry = () => {
    const message = generateWhatsAppMessage({
      context: "general",
      additionalInfo: "Mohon kirim katalog produk lengkap dengan harga terbaru dan informasi cara pemesanan",
    })
    const whatsappUrl = getWhatsAppUrl("6282147566278", message)
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="produk" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Produk Unggulan</h2>
          <p className="text-amber-700 text-lg max-w-2xl mx-auto">
            Nikmati kelezatan singkong keju frozen dengan berbagai varian rasa yang menggugah selera
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={product.images[0] || "/placeholder.svg?height=300&width=300&query=frozen+food+product"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                  Hemat{" "}
                  {(
                    ((Number.parseInt(product.originalPrice.replace(/\D/g, "")) -
                      Number.parseInt(product.price.replace(/\D/g, ""))) /
                      Number.parseInt(product.originalPrice.replace(/\D/g, ""))) *
                    100
                  ).toFixed(0)}
                  %
                </Badge>
                <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">{product.stock}</Badge>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-amber-900">{product.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} ulasan)
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{product.shortDescription}</p>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-amber-900">Keunggulan:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {product.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.features.length - 3} lainnya
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                  </div>
                  <span className="text-sm text-gray-600">{product.specifications.weight}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleOrderWhatsApp(product)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Pesan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleCheckShipping(product.name)}
                    className="border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                  >
                    <Truck className="w-4 h-4 mr-2" />
                    Cek Ongkir
                  </Button>
                </div>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                >
                  <Link href={`/produk/${product.slug}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    Lihat Detail Lengkap
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shipping Calculator Modal */}
        <Dialog open={showShippingModal} onOpenChange={setShowShippingModal}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-amber-900">Kalkulator Ongkos Kirim</DialogTitle>
            </DialogHeader>
            <ShippingCalculator
              isModal={true}
              onClose={() => setShowShippingModal(false)}
              productName={shippingProduct}
            />
          </DialogContent>
        </Dialog>

        <div className="text-center mt-12">
          <p className="text-amber-700 mb-4">Ingin melihat semua produk kami?</p>
          <Button onClick={handleGeneralInquiry} className="bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold">
            <Phone className="w-4 h-4 mr-2" />
            Hubungi Kami di WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
