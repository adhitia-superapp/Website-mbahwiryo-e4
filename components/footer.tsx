import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="#home" className="flex items-center mb-4" prefetch={false}>
            {" "}
            {/* Updated to #home */}
            <Image
              src="/logo-mbah-wiryo-singkong-keju-frozen.png"
              alt="Mbah Wiryo Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-2xl font-bold text-white">Mbah Wiryo</span>
          </Link>
          <p className="text-amber-200 text-sm mb-4">
            Singkong Keju Frozen Gurih, Renyah, Praktis! Nikmati kelezatan khas Mbah Wiryo.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-amber-200 hover:text-white transition-colors" prefetch={false}>
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-amber-200 hover:text-white transition-colors" prefetch={false}>
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-amber-200 hover:text-white transition-colors" prefetch={false}>
              <Twitter className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 text-center md:text-left">Tautan Cepat</h3>
          <ul className="space-y-2 text-center md:text-left">
            <li>
              <Link href="#produk" className="text-amber-200 hover:text-white transition-colors" prefetch={false}>
                {" "}
                {/* Updated to #produk */}
                Produk
              </Link>
            </li>
            <li>
              <Link href="#advantages" className="text-amber-200 hover:text-white transition-colors" prefetch={false}>
                Keunggulan
              </Link>
            </li>
            <li>
              <Link
                href="#reseller-benefits"
                className="text-amber-200 hover:text-white transition-colors"
                prefetch={false}
              >
                Reseller
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="text-amber-200 hover:text-white transition-colors" prefetch={false}>
                Testimoni
              </Link>
            </li>
            <li>
              <Link href="#ongkir" className="text-amber-200 hover:text-white transition-colors" prefetch={false}>
                Cek Ongkir
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 text-center md:text-left">Hubungi Kami</h3>
          <ul className="space-y-2 text-amber-200 text-center md:text-left">
            <li className="flex items-center justify-center md:justify-start">
              <Mail className="w-5 h-5 mr-2" />
              <span>info@mbahwiryo.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <Phone className="w-5 h-5 mr-2" />
              <span>+62 821-4756-6278</span>
            </li>
            <li className="flex items-start justify-center md:justify-start">
              <MapPin className="w-5 h-5 mr-2 mt-1" />
              <span>
                Jl. Raya Tajem No.123, Maguwoharjo, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
              </span>
            </li>
          </ul>
        </div>

        {/* Newsletter (Optional) */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 text-center md:text-left">Newsletter</h3>
          <p className="text-amber-200 text-sm mb-4 text-center md:text-left">
            Dapatkan update terbaru dan promo menarik langsung ke inbox Anda.
          </p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="p-2 rounded-md bg-amber-800 text-white placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-300 text-sm">
        &copy; {new Date().getFullYear()} Mbah Wiryo. All rights reserved.
      </div>
    </footer>
  )
}
