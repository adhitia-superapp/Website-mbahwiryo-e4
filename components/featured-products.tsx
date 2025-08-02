"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, ShoppingCart, Truck, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ShippingCalculator from "./shipping-calculator"

const products = [
  {
    id: 1,
    name: "Singkong Keju Original Premium Frozen",
    price: "Rp 19.000", // Adjusted price for 1000g
    originalPrice: "Rp 22.000", // Adjusted original price for 1000g
    image: "/images/singkong-keju-frozen-mbah-wiryo-kuning-3.jpeg",
    rating: 4.9,
    reviews: 250,
    description:
      "Singkong pilihan dengan keju mozarella premium, dibekukan untuk menjaga kesegaran dan kualitas terbaik. Praktis dan lezat untuk keluarga besar.",
    features: ["Keju Mozarella Premium", "Singkong Pilihan", "Frozen Fresh", "Siap Goreng", "Kemasan Besar"],
    weight: "1000g per pak",
    stock: "Tersedia",
  },
  {
    id: 2,
    name: "Kroket Ragout Ayam Frozen",
    price: "Rp 20.000",
    originalPrice: "Rp 22.000",
    image: "/images/kroket-frozen-mbah-wiryo-1.jpeg",
    rating: 4.9,
    reviews: 156,
    description: "Kroket ragout ayam premium, renyah di luar, lembut di dalam, siap goreng.",
    features: ["Daging Ayam Pilihan", "Ragout Creamy", "Frozen Fresh", "Siap Goreng", "Halal"],
    weight: "300g per pak (isi 6 biji)",
    stock: "Tersedia",
  },
]

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const [showShippingModal, setShowShippingModal] = useState(false)
  const [shippingProduct, setShippingProduct] = useState<string>("")

  const handleOrderWhatsApp = (product: (typeof products)[0]) => {
    const message = `Halo! Saya ingin memesan ${product.name} seharga ${product.price}. Apakah masih tersedia?`
    const whatsappUrl = `https://wa.me/6282147566278?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCheckShipping = (productName: string) => {
    setShippingProduct(productName)
    setShowShippingModal(true)
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
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
                <p className="text-gray-600 text-sm">{product.description}</p>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-amber-900">Keunggulan:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                  </div>
                  <span className="text-sm text-gray-600">{product.weight}</span>
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
                  variant="ghost"
                  onClick={() => setSelectedProduct(product)}
                  className="w-full text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                >
                  Lihat Detail Lengkap
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Detail Modal */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-amber-900">{selectedProduct.name}</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Image
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      width={400}
                      height={400}
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(selectedProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">
                        {selectedProduct.rating} ({selectedProduct.reviews} ulasan)
                      </span>
                    </div>

                    <p className="text-gray-700">{selectedProduct.description}</p>

                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">Keunggulan Produk:</h4>
                      <ul className="space-y-1">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-3xl font-bold text-green-600">{selectedProduct.price}</span>
                          <span className="text-lg text-gray-500 line-through ml-2">
                            {selectedProduct.originalPrice}
                          </span>
                        </div>
                        <Badge className="bg-green-500 hover:bg-green-600">{selectedProduct.stock}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          onClick={() => handleOrderWhatsApp(selectedProduct)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Pesan via WhatsApp
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedProduct(null)
                            handleCheckShipping(selectedProduct.name)
                          }}
                          className="border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Cek Ongkir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

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
          <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold">
            <Link href="https://wa.me/6282147566278" target="_blank">
              <Phone className="w-4 h-4 mr-2" />
              Hubungi Kami di WhatsApp
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
