import { NextResponse } from "next/server"

// Comprehensive fallback data for cities by province
const getFallbackCities = (provinceId?: string) => {
  const cityData: Record<string, any[]> = {
    "5": [
      // DI Yogyakarta
      {
        city_id: "39",
        province_id: "5",
        province: "DI Yogyakarta",
        type: "Kabupaten",
        city_name: "Bantul",
        postal_code: "55711",
      },
      {
        city_id: "153",
        province_id: "5",
        province: "DI Yogyakarta",
        type: "Kabupaten",
        city_name: "Gunung Kidul",
        postal_code: "55812",
      },
      {
        city_id: "207",
        province_id: "5",
        province: "DI Yogyakarta",
        type: "Kabupaten",
        city_name: "Kulon Progo",
        postal_code: "55611",
      },
      {
        city_id: "419",
        province_id: "5",
        province: "DI Yogyakarta",
        type: "Kabupaten",
        city_name: "Sleman",
        postal_code: "55513",
      },
      {
        city_id: "440",
        province_id: "5",
        province: "DI Yogyakarta",
        type: "Kota",
        city_name: "Yogyakarta",
        postal_code: "55111",
      },
    ],
    "6": [
      // DKI Jakarta
      {
        city_id: "151",
        province_id: "6",
        province: "DKI Jakarta",
        type: "Kota",
        city_name: "Jakarta Barat",
        postal_code: "11220",
      },
      {
        city_id: "152",
        province_id: "6",
        province: "DKI Jakarta",
        type: "Kota",
        city_name: "Jakarta Pusat",
        postal_code: "10540",
      },
      {
        city_id: "153",
        province_id: "6",
        province: "DKI Jakarta",
        type: "Kota",
        city_name: "Jakarta Selatan",
        postal_code: "12230",
      },
      {
        city_id: "154",
        province_id: "6",
        province: "DKI Jakarta",
        type: "Kota",
        city_name: "Jakarta Timur",
        postal_code: "13330",
      },
      {
        city_id: "155",
        province_id: "6",
        province: "DKI Jakarta",
        type: "Kota",
        city_name: "Jakarta Utara",
        postal_code: "14140",
      },
    ],
    "9": [
      // Jawa Barat
      {
        city_id: "23",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kota",
        city_name: "Bandung",
        postal_code: "40111",
      },
      {
        city_id: "22",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Bandung",
        postal_code: "40311",
      },
      {
        city_id: "80",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kota",
        city_name: "Bogor",
        postal_code: "16119",
      },
      {
        city_id: "78",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Bogor",
        postal_code: "16911",
      },
      {
        city_id: "39",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kota",
        city_name: "Bekasi",
        postal_code: "17837",
      },
    ],
    "10": [
      // Jawa Tengah
      {
        city_id: "399",
        province_id: "10",
        province: "Jawa Tengah",
        type: "Kota",
        city_name: "Semarang",
        postal_code: "50135",
      },
      {
        city_id: "398",
        province_id: "10",
        province: "Jawa Tengah",
        type: "Kabupaten",
        city_name: "Semarang",
        postal_code: "50511",
      },
      {
        city_id: "455",
        province_id: "10",
        province: "Jawa Tengah",
        type: "Kota",
        city_name: "Surakarta",
        postal_code: "57113",
      },
      {
        city_id: "182",
        province_id: "10",
        province: "Jawa Tengah",
        type: "Kabupaten",
        city_name: "Klaten",
        postal_code: "57411",
      },
    ],
    "11": [
      // Jawa Timur
      {
        city_id: "444",
        province_id: "11",
        province: "Jawa Timur",
        type: "Kota",
        city_name: "Surabaya",
        postal_code: "60119",
      },
      {
        city_id: "419",
        province_id: "11",
        province: "Jawa Timur",
        type: "Kabupaten",
        city_name: "Sidoarjo",
        postal_code: "61219",
      },
      {
        city_id: "249",
        province_id: "11",
        province: "Jawa Timur",
        type: "Kota",
        city_name: "Malang",
        postal_code: "65112",
      },
    ],
  }

  return (
    cityData[provinceId || ""] || [
      {
        city_id: "1",
        province_id: provinceId || "1",
        province: "Unknown",
        type: "Kota",
        city_name: "Kota Utama",
        postal_code: "00000",
      },
    ]
  )
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const provinceId = searchParams.get("province")
  const apiKey = process.env.RAJAONGKIR_API_KEY

  if (!provinceId) {
    return NextResponse.json({ error: "Province ID is required" }, { status: 400 })
  }

  // Always use fallback data if API key is not configured properly
  if (!apiKey || apiKey === "your_actual_api_key_here" || apiKey.length < 10) {
    console.log(`RAJAONGKIR_API_KEY not configured properly. Using fallback city data for province ${provinceId}`)
    return NextResponse.json(
      {
        rajaongkir: {
          results: getFallbackCities(provinceId),
        },
      },
      { status: 200 },
    )
  }

  try {
    console.log(`Fetching cities for province ${provinceId} from RajaOngkir API...`)

    const response = await fetch(`https://api.rajaongkir.com/starter/city?province=${provinceId}`, {
      method: "GET",
      headers: {
        key: apiKey,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    console.log(`RajaOngkir cities API response status: ${response.status}`)

    // Handle specific error statuses
    if (response.status === 410 || response.status === 401 || response.status === 403) {
      console.warn(`RajaOngkir API error ${response.status}, using fallback cities for province ${provinceId}`)
      return NextResponse.json(
        {
          rajaongkir: {
            results: getFallbackCities(provinceId),
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
            results: getFallbackCities(provinceId),
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
            results: getFallbackCities(provinceId),
          },
        },
        { status: 200 },
      )
    }

    console.log(`Successfully fetched ${data.rajaongkir.results.length} cities for province ${provinceId}`)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching cities from RajaOngkir:", error)
    return NextResponse.json(
      {
        rajaongkir: {
          results: getFallbackCities(provinceId),
        },
      },
      { status: 200 },
    )
  }
}
