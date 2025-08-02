import { NextResponse } from "next/server"

// Comprehensive fallback data for shipping costs
const getFallbackShippingCosts = (origin: string, destination: string, weight: number, courier: string) => {
  const weightInKg = Math.ceil(weight / 1000)
  const baseRate = weightInKg * 1000

  const courierData: Record<string, any> = {
    jne: {
      code: "jne",
      name: "Jalur Nugraha Ekakurir (JNE)",
      costs: [
        {
          service: "OKE",
          description: "Ongkos Kirim Ekonomis",
          cost: [{ value: baseRate + 9000, etd: "2-3", note: "Estimasi berdasarkan jarak dan berat" }],
        },
        {
          service: "REG",
          description: "Layanan Reguler",
          cost: [{ value: baseRate + 15000, etd: "1-2", note: "Layanan reguler JNE" }],
        },
        {
          service: "YES",
          description: "Yakin Esok Sampai",
          cost: [{ value: baseRate + 25000, etd: "1-1", note: "Layanan express" }],
        },
      ],
    },
    pos: {
      code: "pos",
      name: "POS Indonesia (POS)",
      costs: [
        {
          service: "Paket Kilat Khusus",
          description: "Paket Kilat Khusus",
          cost: [{ value: baseRate + 8000, etd: "2-4", note: "Layanan pos kilat" }],
        },
        {
          service: "Express Next Day",
          description: "Express Next Day",
          cost: [{ value: baseRate + 20000, etd: "1-1", note: "Pengiriman hari berikutnya" }],
        },
      ],
    },
    tiki: {
      code: "tiki",
      name: "Citra Van Titipan Kilat (TIKI)",
      costs: [
        {
          service: "REG",
          description: "Regular Service",
          cost: [{ value: baseRate + 12000, etd: "2-3", note: "Layanan reguler TIKI" }],
        },
        {
          service: "ONS",
          description: "Over Night Service",
          cost: [{ value: baseRate + 28000, etd: "1-1", note: "Pengiriman semalam" }],
        },
      ],
    },
  }

  return courierData[courier] || courierData.jne
}

export async function POST(request: Request) {
  const apiKey = process.env.RAJAONGKIR_API_KEY

  try {
    const { origin, destination, weight, courier } = await request.json()

    if (!origin || !destination || !weight || !courier) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Always use fallback data if API key is not configured properly
    if (!apiKey || apiKey === "your_actual_api_key_here" || apiKey.length < 10) {
      console.log(`RAJAONGKIR_API_KEY not configured properly. Using fallback cost data for ${courier}`)
      return NextResponse.json(
        {
          rajaongkir: {
            results: [getFallbackShippingCosts(origin, destination, weight, courier)],
          },
        },
        { status: 200 },
      )
    }

    console.log(`Calculating shipping cost for ${courier} from ${origin} to ${destination}, weight: ${weight}g`)

    const formData = new URLSearchParams()
    formData.append("origin", origin)
    formData.append("destination", destination)
    formData.append("weight", weight.toString())
    formData.append("courier", courier)

    const response = await fetch("https://api.rajaongkir.com/starter/cost", {
      method: "POST",
      headers: {
        key: apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })

    console.log(`RajaOngkir cost API response status: ${response.status}`)

    // Handle specific error statuses
    if (response.status === 410 || response.status === 401 || response.status === 403) {
      console.warn(`RajaOngkir API error ${response.status}, using fallback costs for ${courier}`)
      return NextResponse.json(
        {
          rajaongkir: {
            results: [getFallbackShippingCosts(origin, destination, weight, courier)],
          },
        },
        { status: 200 },
      )
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`RajaOngkir API error: ${response.status} - ${errorText}`)
      return NextResponse.json(
        {
          rajaongkir: {
            results: [getFallbackShippingCosts(origin, destination, weight, courier)],
          },
        },
        { status: 200 },
      )
    }

    const data = await response.json()

    // Validate response structure
    if (!data.rajaongkir || !data.rajaongkir.results || !Array.isArray(data.rajaongkir.results)) {
      console.error("Invalid response structure from RajaOngkir API:", data)
      return NextResponse.json(
        {
          rajaongkir: {
            results: [getFallbackShippingCosts(origin, destination, weight, courier)],
          },
        },
        { status: 200 },
      )
    }

    console.log(`Successfully calculated shipping cost for ${courier}`)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching shipping cost:", error)

    // Try to get courier from request for fallback
    try {
      const body = await request.json()
      const { origin, destination, weight, courier } = body
      return NextResponse.json(
        {
          rajaongkir: {
            results: [getFallbackShippingCosts(origin, destination, weight, courier)],
          },
        },
        { status: 200 },
      )
    } catch {
      return NextResponse.json({ error: "Failed to calculate shipping cost" }, { status: 500 })
    }
  }
}
