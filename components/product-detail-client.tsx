"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import InteractiveReviews from "./interactive-reviews"
import {
  Star,
  ShoppingCart,
  Truck,
  Phone,
  ArrowLeft,
  Package,
  Clock,
  Thermometer,
  ChefHat,
  Shield,
  Share2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/products"
import ShippingCalculator from "./shipping-calculator"
import { generateWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp-messages"

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

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

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showShippingModal, setShowShippingModal] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleOrderWhatsApp = () => {
    const message = generateWhatsAppMessage({
      productName: product.name,
      price: product.price,
      weight: product.specifications.weight,
      quantity: quantity,
      context: "product-detail",
    })
    const whatsappUrl = getWhatsAppUrl("6282147566278", message)
    window.open(whatsappUrl, "_blank")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link produk telah disalin ke clipboard!")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-amber-700">
          <Link href="/" className="hover:text-amber-900 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/#produk" className="hover:text-amber-900 transition-colors">
            Produk
          </Link>
          <span>/</span>
          <span className="text-amber-900 font-medium">{product.shortName}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 text-amber-700 hover:text-amber-900 hover:bg-amber-100">
          <Link href="/#produk">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Produk
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-lg">
              <Image
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(600, 600))}`}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? "border-yellow-400" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-green-500 hover:bg-green-600">{product.stock}</Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-amber-700 font-semibold">{product.rating}/5</span>
                <span className="text-amber-600">({product.reviews} ulasan)</span>
              </div>

              <p className="text-lg text-amber-700 leading-relaxed mb-6">{product.shortDescription}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-amber-900 mb-3">Keunggulan Produk:</h3>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-green-600">{product.price}</span>
                  <span className="text-lg text-gray-500 line-through ml-2">{product.originalPrice}</span>
                </div>
                <div className="text-right">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Hemat{" "}
                    {(
                      ((Number.parseInt(product.originalPrice.replace(/\D/g, "")) -
                        Number.parseInt(product.price.replace(/\D/g, ""))) /
                        Number.parseInt(product.originalPrice.replace(/\D/g, ""))) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                </div>
              </div>
              <p className="text-amber-600 text-sm">*{product.specifications.weight} - Belum termasuk ongkir</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="font-medium text-amber-900">Jumlah:</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 p-0"
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 p-0">
                  +
                </Button>
              </div>
              <span className="text-sm text-amber-600">
                Total: Rp {(Number.parseInt(product.price.replace(/\D/g, "")) * quantity).toLocaleString()}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={handleOrderWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Pesan Sekarang
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowShippingModal(true)}
                className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-bold py-3"
              >
                <Truck className="w-4 h-4 mr-2" />
                Cek Ongkir
              </Button>

              <Button
                variant="outline"
                onClick={handleShare}
                className="border-amber-400 text-amber-700 hover:bg-amber-50 font-bold py-3 bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex items-center space-x-2 text-amber-700 bg-amber-100 p-3 rounded-lg">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Butuh bantuan? WhatsApp: 0821-4756-6278</span>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Deskripsi</TabsTrigger>
              <TabsTrigger value="specifications">Spesifikasi</TabsTrigger>
              <TabsTrigger value="cooking">Cara Memasak</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-amber-900">Deskripsi Produk</h3>
                <p className="text-amber-700 leading-relaxed">{product.fullDescription}</p>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
                    <Thermometer className="w-8 h-8 text-blue-500" />
                    <div>
                      <h4 className="font-semibold text-amber-900">Frozen Fresh</h4>
                      <p className="text-sm text-amber-600">Kualitas terjaga</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg">
                    <Clock className="w-8 h-8 text-green-500" />
                    <div>
                      <h4 className="font-semibold text-amber-900">Siap Goreng</h4>
                      <p className="text-sm text-amber-600">Praktis & cepat</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-yellow-50 p-4 rounded-lg">
                    <Shield className="w-8 h-8 text-yellow-500" />
                    <div>
                      <h4 className="font-semibold text-amber-900">Halal</h4>
                      <p className="text-sm text-amber-600">Tersertifikasi</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-amber-900">Spesifikasi Produk</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">Berat</p>
                        <p className="text-amber-700">{product.specifications.weight}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">Kemasan</p>
                        <p className="text-amber-700">{product.specifications.packaging}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Thermometer className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">Penyimpanan</p>
                        <p className="text-amber-700">{product.specifications.storage}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">Masa Simpan</p>
                        <p className="text-amber-700">{product.specifications.shelfLife}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-amber-900 mb-2">Komposisi:</p>
                      <ul className="list-disc list-inside text-amber-700 space-y-1">
                        {product.specifications.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-amber-900 mb-2">Informasi Gizi (per 100g):</p>
                      <div className="space-y-1 text-amber-700">
                        <p>Kalori: {product.specifications.nutrition.calories}</p>
                        <p>Protein: {product.specifications.nutrition.protein}</p>
                        <p>Karbohidrat: {product.specifications.nutrition.carbs}</p>
                        <p>Lemak: {product.specifications.nutrition.fat}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cooking" className="p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <ChefHat className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-amber-900">Cara Memasak</h3>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="font-medium text-amber-900 mb-2">Metode: {product.cookingInstructions.method}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-900 mb-3">Langkah-langkah:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-amber-700">
                    {product.cookingInstructions.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-900 mb-3">Tips Memasak:</h4>
                  <ul className="list-disc list-inside space-y-2 text-amber-700">
                    {product.cookingInstructions.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6">
              <InteractiveReviews productId={product.id} productName={product.name} />
            </TabsContent>
          </Tabs>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-amber-900">Pertanyaan yang Sering Diajukan</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {product.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-amber-900">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-amber-700">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900">Produk Lainnya</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex space-x-4 p-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={relatedProduct.images[0] || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover rounded-lg"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-semibold text-amber-900">{relatedProduct.shortName}</h4>
                        <p className="text-sm text-amber-700">{relatedProduct.shortDescription}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-green-600">{relatedProduct.price}</span>
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/produk/${relatedProduct.slug}`}>Lihat Detail</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Shipping Calculator Modal */}
      <Dialog open={showShippingModal} onOpenChange={setShowShippingModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-amber-900">Kalkulator Ongkos Kirim</DialogTitle>
          </DialogHeader>
          <ShippingCalculator isModal={true} onClose={() => setShowShippingModal(false)} productName={product.name} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
