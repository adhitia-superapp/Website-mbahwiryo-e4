"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Truck, Package, MapPin, Calculator, MessageSquare, X } from "lucide-react"
import { generateWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp-messages"

interface Province {
  province_id: string
  province: string
}

interface City {
  city_id: string
  city_name: string
  type: string
  postal_code: string
}

interface ShippingCost {
  service: string
  description: string
  cost: Array<{
    value: number
    etd: string
    note: string
  }>
}

interface CourierResult {
  code: string
  name: string
  costs: ShippingCost[]
}

interface ShippingCalculatorProps {
  isModal?: boolean
  onClose?: () => void
  productName?: string
}

export default function ShippingCalculator({ isModal = false, onClose, productName }: ShippingCalculatorProps) {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [weight, setWeight] = useState("1000") // Default 1kg
  const [quantity, setQuantity] = useState(1)
  const [shippingResults, setShippingResults] = useState<CourierResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Load provinces on component mount
  useEffect(() => {
    fetchProvinces()
  }, [])

  const fetchProvinces = async () => {
    try {
      const response = await fetch("/api/rajaongkir/province")
      const data = await response.json()
      if (data.rajaongkir?.results) {
        setProvinces(data.rajaongkir.results)
      }
    } catch (error) {
      console.error("Error fetching provinces:", error)
      setError("Gagal memuat data provinsi")
    }
  }

  const fetchCities = async (provinceId: string) => {
    try {
      const response = await fetch(`/api/rajaongkir/city?province=${provinceId}`)
      const data = await response.json()
      if (data.rajaongkir?.results) {
        setCities(data.rajaongkir.results)
      }
    } catch (error) {
      console.error("Error fetching cities:", error)
      setError("Gagal memuat data kota")
    }
  }

  const calculateShipping = async () => {
    if (!selectedCity || !weight) {
      setError("Mohon lengkapi semua field")
      return
    }

    setIsLoading(true)
    setError("")
    setShippingResults([])

    try {
      const totalWeight = Number.parseInt(weight) * quantity
      const couriers = ["jne", "pos", "tiki"]
      const results: CourierResult[] = []

      for (const courier of couriers) {
        try {
          const response = await fetch("/api/rajaongkir/cost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              origin: "444", // Kota Semarang (sesuaikan dengan lokasi Anda)
              destination: selectedCity,
              weight: totalWeight,
              courier: courier,
            }),
          })

          const data = await response.json()
          if (data.rajaongkir?.results?.[0]) {
            results.push(data.rajaongkir.results[0])
          }
        } catch (courierError) {
          console.error(`Error fetching ${courier} costs:`, courierError)
        }
      }

      setShippingResults(results)
    } catch (error) {
      console.error("Error calculating shipping:", error)
      setError("Gagal menghitung ongkos kirim")
    } finally {
      setIsLoading(false)
    }
  }

  const handleProvinceChange = (provinceId: string) => {
    setSelectedProvince(provinceId)
    setSelectedCity("")
    setCities([])
    setShippingResults([])
    if (provinceId) {
      fetchCities(provinceId)
    }
  }

  const handleOrderWithShipping = (courier: string, service: string, cost: number, etd: string) => {
    const selectedProvinceName = provinces.find((p) => p.province_id === selectedProvince)?.province || ""
    const selectedCityName = cities.find((c) => c.city_id === selectedCity)?.city_name || ""
    const fullAddress = `${selectedCityName}, ${selectedProvinceName}`

    const message = generateWhatsAppMessage({
      productName: productName || "Produk Mbah Wiryo",
      quantity: quantity,
      customerAddress: fullAddress,
      shippingService: `${courier.toUpperCase()} - ${service}`,
      shippingCost: `Rp ${cost.toLocaleString()}`,
      additionalInfo: `Estimasi pengiriman: ${etd} hari`,
      context: "shipping",
    })

    const whatsappUrl = getWhatsAppUrl("6282147566278", message)
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className={`${isModal ? "" : "py-16 bg-gradient-to-br from-blue-50 to-indigo-50"}`}>
      <div className={`${isModal ? "" : "container mx-auto px-4"}`}>
        {!isModal && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Kalkulator Ongkos Kirim</h2>
            <p className="text-amber-700 text-lg max-w-2xl mx-auto">
              Hitung ongkos kirim ke seluruh Indonesia dengan berbagai pilihan kurir
            </p>
          </div>
        )}

        <Card className={`${isModal ? "" : "max-w-4xl mx-auto"} bg-white/90 backdrop-blur-sm shadow-xl`}>
          {isModal && onClose && (
            <div className="flex justify-end p-4 pb-0">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              {productName ? `Ongkir untuk ${productName}` : "Kalkulator Ongkos Kirim"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Product Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-amber-800">Jumlah Produk</Label>
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
                  <span className="text-sm text-amber-600">pak</span>
                </div>
              </div>

              <div>
                <Label htmlFor="weight" className="text-amber-800">
                  Berat per Pak (gram)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="border-amber-200 focus:border-amber-400"
                  placeholder="1000"
                />
                <p className="text-xs text-amber-600 mt-1">
                  Total berat: {(Number.parseInt(weight || "0") * quantity).toLocaleString()} gram
                </p>
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-4">
              <h3 className="font-semibold text-amber-900 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Tujuan Pengiriman
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-amber-800">Provinsi</Label>
                  <Select value={selectedProvince} onValueChange={handleProvinceChange}>
                    <SelectTrigger className="border-amber-200 focus:border-amber-400">
                      <SelectValue placeholder="Pilih provinsi" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province.province_id} value={province.province_id}>
                          {province.province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-amber-800">Kota/Kabupaten</Label>
                  <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedProvince}>
                    <SelectTrigger className="border-amber-200 focus:border-amber-400">
                      <SelectValue placeholder="Pilih kota" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.city_id} value={city.city_id}>
                          {city.type} {city.city_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <Button
              onClick={calculateShipping}
              disabled={isLoading || !selectedCity || !weight}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
            >
              {isLoading ? (
                <>
                  <Package className="w-4 h-4 mr-2 animate-spin" />
                  Menghitung...
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 mr-2" />
                  Hitung Ongkos Kirim
                </>
              )}
            </Button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Shipping Results */}
            {shippingResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-amber-900 flex items-center">
                  <Truck className="w-4 h-4 mr-2" />
                  Pilihan Pengiriman
                </h3>

                <div className="space-y-3">
                  {shippingResults.map((courier) => (
                    <Card key={courier.code} className="border-amber-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-amber-900 uppercase">{courier.name}</h4>
                          <Badge variant="outline">{courier.code.toUpperCase()}</Badge>
                        </div>

                        <div className="space-y-2">
                          {courier.costs.map((cost, index) => (
                            <div key={index}>
                              {cost.cost.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                                >
                                  <div>
                                    <p className="font-medium text-amber-900">{cost.service}</p>
                                    <p className="text-sm text-amber-700">{cost.description}</p>
                                    <p className="text-xs text-amber-600">Estimasi: {option.etd} hari</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-green-600 text-lg">
                                      Rp {option.value.toLocaleString()}
                                    </p>
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleOrderWithShipping(courier.name, cost.service, option.value, option.etd)
                                      }
                                      className="bg-green-600 hover:bg-green-700 text-white mt-2"
                                    >
                                      <MessageSquare className="w-3 h-3 mr-1" />
                                      Pesan
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              {index < courier.costs.length - 1 && <Separator className="my-2" />}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Catatan:</strong> Ongkos kirim dapat berubah sewaktu-waktu sesuai kebijakan kurir. Estimasi
                    waktu pengiriman tidak termasuk hari libur dan dapat berbeda tergantung kondisi.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
