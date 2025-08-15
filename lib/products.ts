export interface Product {
  id: number
  slug: string
  name: string
  shortName: string
  price: string
  originalPrice: string
  images: string[]
  rating: number
  reviews: number
  shortDescription: string
  fullDescription: string
  features: string[]
  specifications: {
    weight: string
    packaging: string
    storage: string
    shelfLife: string
    ingredients: string[]
    nutrition: {
      calories: string
      protein: string
      carbs: string
      fat: string
    }
  }
  cookingInstructions: {
    method: string
    steps: string[]
    tips: string[]
  }
  stock: string
  category: string
  tags: string[]
  faqs: {
    question: string
    answer: string
  }[]
  testimonials: {
    name: string
    rating: number
    comment: string
    date: string
  }[]
}

export const products: Product[] = [
  {
    id: 1,
    slug: "singkong-keju-original-premium-frozen",
    name: "Singkong Keju Original Premium Frozen",
    shortName: "Singkong Keju Original",
    price: "Rp 19.000",
    originalPrice: "Rp 22.000",
    images: [
      "/images/singkong-keju-frozen-mbah-wiryo-kuning-3.jpeg",
      "/images/singkong-keju-frozen-mbah-wiryo-kuning-2.jpeg",
      "/images/product-singkong-keju-frozen-mbah-wiryo.jpeg",
    ],
    rating: 4.9,
    reviews: 250,
    shortDescription:
      "Singkong pilihan dengan keju mozarella premium, dibekukan untuk menjaga kesegaran dan kualitas terbaik.",
    fullDescription:
      "Singkong Keju Original Premium Frozen Mbah Wiryo adalah camilan tradisional Indonesia yang telah dimodernisasi dengan teknologi pembekuan untuk menjaga kesegaran dan kualitas. Dibuat dari singkong pilihan yang dipanen pada waktu yang tepat, kemudian dipadukan dengan keju mozarella premium berkualitas tinggi. Proses pembuatan yang higienis dan teknologi frozen yang canggih memastikan setiap gigitan memberikan tekstur yang renyah di luar dan lembut di dalam, dengan cita rasa keju yang melimpah dan gurih khas singkong yang autentik.",
    features: [
      "Keju Mozarella Premium",
      "Singkong Pilihan",
      "Frozen Fresh",
      "Siap Goreng",
      "Kemasan Besar",
      "Halal Certified",
    ],
    specifications: {
      weight: "1000g per pak",
      packaging: "Vacuum sealed plastic bag",
      storage: "Simpan di freezer (-18°C)",
      shelfLife: "6 bulan dari tanggal produksi",
      ingredients: ["Singkong segar", "Keju mozarella", "Tepung terigu", "Telur", "Garam", "Merica", "Bawang putih"],
      nutrition: {
        calories: "180 kcal per 100g",
        protein: "8g",
        carbs: "25g",
        fat: "6g",
      },
    },
    cookingInstructions: {
      method: "Deep Frying",
      steps: [
        "Keluarkan singkong keju dari freezer",
        "Panaskan minyak goreng dengan api sedang (170°C)",
        "Goreng singkong keju selama 3-4 menit hingga golden brown",
        "Angkat dan tiriskan minyak",
        "Sajikan selagi hangat untuk hasil terbaik",
      ],
      tips: [
        "Jangan dicairkan terlebih dahulu, langsung goreng dari kondisi beku",
        "Gunakan api sedang agar matang merata",
        "Pastikan minyak cukup panas sebelum memasukkan singkong keju",
        "Jangan terlalu lama menggoreng agar tidak gosong",
      ],
    },
    stock: "Tersedia",
    category: "Frozen Food",
    tags: ["singkong", "keju", "frozen", "camilan", "tradisional", "premium"],
    faqs: [
      {
        question: "Berapa lama daya tahan produk ini?",
        answer: "Singkong Keju Frozen dapat bertahan hingga 6 bulan jika disimpan di freezer dengan suhu -18°C.",
      },
      {
        question: "Apakah perlu dicairkan sebelum digoreng?",
        answer: "Tidak perlu dicairkan. Langsung goreng dari kondisi beku untuk hasil yang optimal.",
      },
      {
        question: "Berapa lama waktu menggoreng yang ideal?",
        answer: "Goreng selama 3-4 menit dengan api sedang hingga berwarna golden brown.",
      },
      {
        question: "Apakah produk ini halal?",
        answer: "Ya, semua produk Mbah Wiryo telah tersertifikasi halal dan aman dikonsumsi.",
      },
    ],
    testimonials: [
      {
        name: "Sari Dewi",
        rating: 5,
        comment: "Enak banget! Kejunya melimpah dan singkongnya empuk. Anak-anak suka sekali.",
        date: "2024-01-15",
      },
      {
        name: "Budi Hartono",
        rating: 5,
        comment: "Praktis untuk jualan, pelanggan selalu repeat order. Kualitas konsisten.",
        date: "2024-01-10",
      },
      {
        name: "Maya Sari",
        rating: 4,
        comment: "Rasanya autentik, seperti buatan rumah. Packaging juga rapi.",
        date: "2024-01-08",
      },
    ],
  },
  {
    id: 2,
    slug: "kroket-ragout-ayam-frozen",
    name: "Kroket Ragout Ayam Frozen",
    shortName: "Kroket Ayam",
    price: "Rp 20.000",
    originalPrice: "Rp 22.000",
    images: ["/images/kroket-frozen-mbah-wiryo-1.jpeg"],
    rating: 4.9,
    reviews: 156,
    shortDescription: "Kroket ragout ayam premium, renyah di luar, lembut di dalam, siap goreng.",
    fullDescription:
      "Kroket Ragout Ayam Frozen Mbah Wiryo adalah perpaduan sempurna antara tradisi kuliner Eropa dan cita rasa Indonesia. Dibuat dengan daging ayam pilihan yang diolah menjadi ragout creamy yang kaya rasa, kemudian dibungkus dengan lapisan tepung roti yang renyah. Setiap kroket berisi ragout ayam yang lezat dengan tekstur yang lembut dan creamy, memberikan sensasi meleleh di mulut. Proses pembekuan yang tepat memastikan kualitas dan kesegaran tetap terjaga hingga sampai ke tangan konsumen.",
    features: ["Daging Ayam Pilihan", "Ragout Creamy", "Frozen Fresh", "Siap Goreng", "Halal", "Kemasan Praktis"],
    specifications: {
      weight: "300g per pak (isi 6 biji)",
      packaging: "Vacuum sealed plastic bag",
      storage: "Simpan di freezer (-18°C)",
      shelfLife: "4 bulan dari tanggal produksi",
      ingredients: [
        "Daging ayam",
        "Susu",
        "Tepung terigu",
        "Butter",
        "Bawang bombay",
        "Wortel",
        "Seledri",
        "Tepung roti",
      ],
      nutrition: {
        calories: "220 kcal per 100g",
        protein: "12g",
        carbs: "18g",
        fat: "12g",
      },
    },
    cookingInstructions: {
      method: "Deep Frying",
      steps: [
        "Keluarkan kroket dari freezer",
        "Panaskan minyak goreng dengan api sedang (170°C)",
        "Goreng kroket selama 4-5 menit hingga golden brown",
        "Angkat dan tiriskan minyak",
        "Sajikan dengan saus sambal atau mayones",
      ],
      tips: [
        "Goreng langsung dari kondisi beku",
        "Jangan terlalu panas minyaknya agar tidak pecah",
        "Balik kroket secara perlahan agar tidak rusak",
        "Sajikan segera setelah digoreng untuk tekstur terbaik",
      ],
    },
    stock: "Tersedia",
    category: "Frozen Food",
    tags: ["kroket", "ayam", "ragout", "frozen", "premium", "creamy"],
    faqs: [
      {
        question: "Apa isi dari kroket ini?",
        answer: "Kroket berisi ragout ayam creamy yang terbuat dari daging ayam pilihan, susu, dan sayuran.",
      },
      {
        question: "Berapa biji kroket dalam satu kemasan?",
        answer: "Setiap kemasan berisi 6 biji kroket dengan total berat 300g.",
      },
      {
        question: "Bagaimana cara penyimpanan yang benar?",
        answer: "Simpan di freezer dengan suhu -18°C dan dapat bertahan hingga 4 bulan.",
      },
      {
        question: "Apakah bisa digoreng dengan air fryer?",
        answer: "Ya, bisa digoreng dengan air fryer pada suhu 180°C selama 8-10 menit.",
      },
    ],
    testimonials: [
      {
        name: "Andi Wijaya",
        rating: 5,
        comment: "Kroketnya enak banget! Isinya creamy dan gurih. Cocok untuk camilan keluarga.",
        date: "2024-01-12",
      },
      {
        name: "Lisa Permata",
        rating: 5,
        comment: "Kualitas premium dengan harga terjangkau. Packaging juga aman untuk pengiriman.",
        date: "2024-01-09",
      },
      {
        name: "Rudi Santoso",
        rating: 4,
        comment: "Rasanya authentic, seperti kroket buatan restoran. Recommended!",
        date: "2024-01-05",
      },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(currentProductId: number, limit = 2): Product[] {
  return products.filter((product) => product.id !== currentProductId).slice(0, limit)
}
