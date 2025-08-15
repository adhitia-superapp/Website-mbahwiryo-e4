"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingUp,
  DollarSign,
  Truck,
  HeadphonesIcon,
  Award,
  Phone,
  Mail,
  User,
  Building,
  MessageSquare,
} from "lucide-react"
import { generateWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp-messages"

export default function ResellerForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    businessType: "",
    experience: "",
    targetMarket: "",
    additionalInfo: "",
    agreeTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeTerms) {
      alert("Mohon setujui syarat dan ketentuan terlebih dahulu")
      return
    }

    setIsSubmitting(true)

    try {
      // Generate WhatsApp message with form data
      const message = generateWhatsAppMessage({
        customerName: formData.name,
        customerPhone: formData.phone,
        customerAddress: `${formData.address}, ${formData.city}`,
        additionalInfo: `
📧 Email: ${formData.email}
🏢 Jenis Bisnis: ${formData.businessType}
📈 Pengalaman: ${formData.experience}
🎯 Target Market: ${formData.targetMarket}
📝 Info Tambahan: ${formData.additionalInfo}`,
        context: "reseller",
      })

      const whatsappUrl = getWhatsAppUrl("6282147566278", message)
      window.open(whatsappUrl, "_blank")

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        businessType: "",
        experience: "",
        targetMarket: "",
        additionalInfo: "",
        agreeTerms: false,
      })

      alert("Terima kasih! Anda akan diarahkan ke WhatsApp untuk melanjutkan pendaftaran.")
    } catch (error) {
      console.error("Error:", error)
      alert("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "Harga Khusus Reseller",
      description: "Dapatkan harga spesial dengan margin keuntungan yang menarik",
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      title: "Gratis Ongkir",
      description: "Gratis ongkos kirim untuk pembelian minimum tertentu",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 text-purple-500" />,
      title: "Support Marketing",
      description: "Dukungan materi promosi dan strategi pemasaran",
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "Sertifikat Reseller",
      description: "Sertifikat resmi sebagai mitra reseller Mbah Wiryo",
    },
    {
      icon: <Users className="w-8 h-8 text-red-500" />,
      title: "Komunitas Reseller",
      description: "Bergabung dengan komunitas reseller aktif",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-500" />,
      title: "Pelatihan Bisnis",
      description: "Pelatihan dan workshop untuk mengembangkan bisnis",
    },
  ]

  return (
    <section id="reseller" className="py-16 bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Bergabung Sebagai Reseller</h2>
          <p className="text-amber-700 text-lg max-w-2xl mx-auto">
            Raih kesempatan emas menjadi mitra reseller Mbah Wiryo dan dapatkan keuntungan berlimpah
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Benefits Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Keuntungan Menjadi Reseller</h3>
              <div className="grid gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-white/70 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">{benefit.title}</h4>
                      <p className="text-amber-700 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-amber-900">Syarat Menjadi Reseller</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-amber-700">
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                      ✓
                    </Badge>
                    <span>Memiliki usaha atau toko (online/offline)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                      ✓
                    </Badge>
                    <span>Komitmen untuk menjual produk secara konsisten</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                      ✓
                    </Badge>
                    <span>Minimum order pertama 50 pak</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                      ✓
                    </Badge>
                    <span>Memiliki media sosial aktif untuk promosi</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-amber-900 text-center">Form Pendaftaran Reseller</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-amber-900 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Informasi Pribadi
                  </h4>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-amber-800">
                        Nama Lengkap *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="border-amber-200 focus:border-amber-400"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-amber-800">
                        No. WhatsApp *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="border-amber-200 focus:border-amber-400"
                        placeholder="08xxxxxxxxxx"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-amber-800">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-amber-200 focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-amber-800">
                      Alamat Lengkap *
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="border-amber-200 focus:border-amber-400"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-amber-800">
                      Kota *
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="border-amber-200 focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-amber-900 flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    Informasi Bisnis
                  </h4>

                  <div>
                    <Label htmlFor="businessType" className="text-amber-800">
                      Jenis Bisnis *
                    </Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => handleInputChange("businessType", value)}
                    >
                      <SelectTrigger className="border-amber-200 focus:border-amber-400">
                        <SelectValue placeholder="Pilih jenis bisnis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toko-offline">Toko Offline</SelectItem>
                        <SelectItem value="toko-online">Toko Online</SelectItem>
                        <SelectItem value="warung-makan">Warung Makan</SelectItem>
                        <SelectItem value="katering">Katering</SelectItem>
                        <SelectItem value="reseller-individu">Reseller Individu</SelectItem>
                        <SelectItem value="distributor">Distributor</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-amber-800">
                      Pengalaman Bisnis *
                    </Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => handleInputChange("experience", value)}
                    >
                      <SelectTrigger className="border-amber-200 focus:border-amber-400">
                        <SelectValue placeholder="Pilih pengalaman bisnis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baru-mulai">Baru Mulai</SelectItem>
                        <SelectItem value="1-2-tahun">1-2 Tahun</SelectItem>
                        <SelectItem value="3-5-tahun">3-5 Tahun</SelectItem>
                        <SelectItem value="lebih-5-tahun">Lebih dari 5 Tahun</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="targetMarket" className="text-amber-800">
                      Target Market *
                    </Label>
                    <Select
                      value={formData.targetMarket}
                      onValueChange={(value) => handleInputChange("targetMarket", value)}
                    >
                      <SelectTrigger className="border-amber-200 focus:border-amber-400">
                        <SelectValue placeholder="Pilih target market" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="konsumen-langsung">Konsumen Langsung</SelectItem>
                        <SelectItem value="toko-retail">Toko Retail</SelectItem>
                        <SelectItem value="warung-makan">Warung Makan</SelectItem>
                        <SelectItem value="online-marketplace">Online Marketplace</SelectItem>
                        <SelectItem value="media-sosial">Media Sosial</SelectItem>
                        <SelectItem value="campuran">Campuran</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo" className="text-amber-800">
                      Informasi Tambahan
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                      className="border-amber-200 focus:border-amber-400"
                      rows={3}
                      placeholder="Ceritakan tentang bisnis Anda, rencana penjualan, atau pertanyaan lainnya..."
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                    className="border-amber-400 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="agreeTerms" className="text-sm text-amber-700 leading-relaxed">
                    Saya setuju dengan syarat dan ketentuan menjadi reseller Mbah Wiryo, serta bersedia menjalankan
                    kewajiban sebagai mitra reseller dengan baik dan konsisten.
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.agreeTerms}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <MessageSquare className="w-4 h-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Daftar Sekarang via WhatsApp
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-amber-600">
                  Dengan mendaftar, Anda akan diarahkan ke WhatsApp untuk proses selanjutnya
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <Card className="bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-amber-900 mb-4">Butuh Informasi Lebih Lanjut?</h3>
              <p className="text-amber-700 mb-6">
                Tim kami siap membantu Anda memahami program reseller dan menjawab pertanyaan Anda
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-amber-700">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">0821-4756-6278</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-amber-700">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">info@mbahwiryo.com</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  const message = generateWhatsAppMessage({
                    context: "general",
                    additionalInfo: "Saya ingin mengetahui lebih lanjut tentang program reseller Mbah Wiryo",
                  })
                  const whatsappUrl = getWhatsAppUrl("6282147566278", message)
                  window.open(whatsappUrl, "_blank")
                }}
                variant="outline"
                className="border-amber-400 text-amber-700 hover:bg-amber-50"
              >
                <Phone className="w-4 h-4 mr-2" />
                Hubungi Kami
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
