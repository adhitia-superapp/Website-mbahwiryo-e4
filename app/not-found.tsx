import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, Search, Phone } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-12 h-12 text-amber-600" />
          </div>
          <CardTitle className="text-2xl text-amber-900">Halaman Tidak Ditemukan</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-amber-700">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau URL salah.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full border-amber-400 text-amber-700 hover:bg-amber-50 bg-transparent"
            >
              <Link href="/#produk">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Lihat Produk
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-full text-amber-700 hover:bg-amber-50">
              <Link href="https://wa.me/6282147566278" target="_blank">
                <Phone className="w-4 h-4 mr-2" />
                Hubungi Kami
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
