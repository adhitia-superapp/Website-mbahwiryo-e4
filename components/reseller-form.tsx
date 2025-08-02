"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, User, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ResellerForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const whatsappMessage = `Halo Mbah Wiryo, saya tertarik menjadi reseller!%0A%0ANama Lengkap: ${name}%0AEmail: ${email}%0ANomor Telepon/WhatsApp: ${phone}%0APesan: ${message || "Tidak ada pesan tambahan."}%0A%0AMohon informasinya lebih lanjut. Terima kasih!`
    const whatsappUrl = `https://wa.me/6282147566278?text=${whatsappMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")

    setLoading(false)
    toast({
      title: "Formulir Terkirim ke WhatsApp!",
      description: "Silakan lanjutkan percakapan di WhatsApp untuk pendaftaran reseller.",
      variant: "default",
    })

    // Clear form
    setName("")
    setEmail("")
    setPhone("")
    setMessage("")
  }

  return (
    <section id="reseller-form" className="py-16 bg-gradient-to-br from-yellow-50 to-amber-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Daftar Reseller</h2>
          <p className="text-amber-700 text-lg">
            Tertarik menjadi bagian dari keluarga Mbah Wiryo? Isi formulir di bawah ini!
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-900 rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Formulir Pendaftaran</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-amber-900 font-medium flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Nama Lengkap</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-amber-900 font-medium flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                  placeholder="Masukkan alamat email Anda"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-amber-900 font-medium flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Nomor Telepon/WhatsApp</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="mt-2"
                  placeholder="Contoh: 081234567890"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-amber-900 font-medium flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Pesan (Opsional)</span>
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2"
                  placeholder="Sampaikan minat Anda atau pertanyaan di sini..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold py-3 text-lg"
              >
                {loading ? "Mengarahkan ke WhatsApp..." : "Daftar Sekarang via WhatsApp"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
