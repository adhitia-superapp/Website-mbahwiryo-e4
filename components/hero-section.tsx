"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, ShoppingCart, Truck, Phone, Award, Clock, Snowflake } from "lucide-react"
import Image from "next/image"
import ShippingCalculator from "./shipping-calculator"

export default function HeroSection() {
  const [showShippingModal, setShowShippingModal] = useState(false)

  const handleOrderWhatsApp = () => {
    const message = "Halo! Saya tertarik dengan produk Singkong Keju Frozen Mbah Wiryo. Bisa info lebih lanjut?"
    const whatsappUrl = `https://wa.me/6282147566278?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="w-6 h-6 text-yellow-500" />
                <span className="text-yellow-700 font-semibold">Produk Unggulan #1</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-amber-900 leading-tight">
                Singkong Keju
                <span className="block text-yellow-600">Frozen Premium</span>
              </h1>

              <p className="text-xl text-amber-700 leading-relaxed">
                Nikmati kelezatan singkong pilihan dengan keju mozarella premium yang dibekukan untuk menjaga kesegaran
                dan kualitas terbaik. Siap goreng, praktis, dan lezat!
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-lg p-4">
                <Snowflake className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-amber-900">Frozen Fresh</h3>
                  <p className="text-sm text-amber-600">Kualitas terjaga</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-lg p-4">
                <Clock className="w-8 h-8 text-green-500" />
                <div>
                  <h3 className="font-semibold text-amber-900">Siap Goreng</h3>
                  <p className="text-sm text-amber-600">Praktis & cepat</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-lg p-4">
                <Award className="w-8 h-8 text-yellow-500" />
                <div>
                  <h3 className="font-semibold text-amber-900">Premium</h3>
                  <p className="text-sm text-amber-600">Keju mozarella</p>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-amber-700 font-semibold">4.8/5</span>
              <span className="text-amber-600">(500+ ulasan)</span>
            </div>

            {/* Price */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-green-600">Rp 19.000</span>
                  <span className="text-lg text-gray-500 line-through ml-2">Rp 22.000</span>
                </div>
                <div className="text-right">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Hemat 17%</div>
                </div>
              </div>
              <p className="text-amber-600 text-sm">*Harga per pak (250g) - Belum termasuk ongkir</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleOrderWhatsApp}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Pesan Sekarang
              </Button>

              <Button
                onClick={() => setShowShippingModal(true)}
                variant="outline"
                size="lg"
                className="border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-bold py-4 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Truck className="w-5 h-5 mr-2" />
                Cek Ongkir
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex items-center space-x-2 text-amber-700">
              <Phone className="w-4 h-4" />
              <span className="text-sm">WhatsApp: 0821-4756-6278</span>
            </div>
          </div>

          {/* Right Content - Product Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/images/product-singkong-keju-frozen-mbah-wiryo.jpeg"
                alt="Singkong Keju Frozen Mbah Wiryo"
                width={600}
                height={600}
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-amber-900 px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
                🔥 Best Seller!
              </div>

              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                ✅ Ready Stock
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-3xl transform rotate-6 scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-orange-200/20 to-yellow-200/20 rounded-3xl transform -rotate-3 scale-110"></div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-amber-900">500+</div>
            <div className="text-amber-600">Pelanggan Puas</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-amber-900">4.8★</div>
            <div className="text-amber-600">Rating Produk</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-amber-900">100%</div>
            <div className="text-amber-600">Halal & Aman</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-amber-900">24/7</div>
            <div className="text-amber-600">Customer Service</div>
          </div>
        </div>
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
            productName="Singkong Keju Frozen"
          />
        </DialogContent>
      </Dialog>
    </section>
  )
}
