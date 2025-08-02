"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, Truck } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ShippingCalculator from "./shipping-calculator"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isOngkirModalOpen, setIsOngkirModalOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2" prefetch={false}>
          {" "}
          {/* Updated to #home */}
          <Image
            src="/logo-mbah-wiryo-singkong-keju-frozen.png"
            alt="Mbah Wiryo Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-amber-900">Mbah Wiryo</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#produk"
            className="text-amber-800 hover:text-amber-900 font-medium transition-colors"
            prefetch={false}
          >
            Produk
          </Link>
          <Link
            href="#advantages"
            className="text-amber-800 hover:text-amber-900 font-medium transition-colors"
            prefetch={false}
          >
            Keunggulan
          </Link>
          <Link
            href="#reseller-benefits"
            className="text-amber-800 hover:text-amber-900 font-medium transition-colors"
            prefetch={false}
          >
            Reseller
          </Link>
          <Link
            href="#testimonials"
            className="text-amber-800 hover:text-amber-900 font-medium transition-colors"
            prefetch={false}
          >
            Testimoni
          </Link>
          <Button
            variant="ghost"
            onClick={() => setIsOngkirModalOpen(true)}
            className="text-amber-800 hover:text-amber-900 font-medium transition-colors"
          >
            <Truck className="w-4 h-4 mr-2" />
            Cek Ongkir
          </Button>
          <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
            <Link href="https://wa.me/6282147566278" target="_blank">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Pesan Sekarang
            </Link>
          </Button>
        </nav>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden bg-transparent">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col">
            <Link href="#home" className="flex items-center gap-2 py-4" prefetch={false}>
              {" "}
              {/* Updated to #home */}
              <Image
                src="/logo-mbah-wiryo-singkong-keju-frozen.png"
                alt="Mbah Wiryo Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-amber-900">Mbah Wiryo</span>
            </Link>
            <nav className="grid gap-4 py-6">
              <Link
                href="#produk"
                className="text-amber-800 hover:text-amber-900 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                prefetch={false}
              >
                Produk
              </Link>
              <Link
                href="#advantages"
                className="text-amber-800 hover:text-amber-900 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                prefetch={false}
              >
                Keunggulan
              </Link>
              <Link
                href="#reseller-benefits"
                className="text-amber-800 hover:text-amber-900 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                prefetch={false}
              >
                Reseller
              </Link>
              <Link
                href="#testimonials"
                className="text-amber-800 hover:text-amber-900 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                prefetch={false}
              >
                Testimoni
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsOngkirModalOpen(true)
                }}
                className="text-amber-800 hover:text-amber-900 font-medium transition-colors justify-start"
              >
                <Truck className="w-4 h-4 mr-2" />
                Cek Ongkir
              </Button>
              <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
                <Link href="https://wa.me/6282147566278" target="_blank" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Pesan Sekarang
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <Dialog open={isOngkirModalOpen} onOpenChange={setIsOngkirModalOpen}>
        <DialogContent className="sm:max-w-[800px] p-6">
          <DialogHeader>
            <DialogTitle className="text-amber-900 text-2xl">Kalkulator Ongkos Kirim</DialogTitle>
          </DialogHeader>
          <ShippingCalculator isModal={true} onClose={() => setIsOngkirModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </header>
  )
}
