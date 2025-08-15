interface WhatsAppMessageOptions {
  productName: string
  price: string
  weight?: string
  quantity?: number
  context: "hero" | "product-list" | "product-detail" | "shipping" | "reseller"
  customerName?: string
  customerAddress?: string
  shippingCost?: string
  courier?: string
  estimatedDelivery?: string
}

interface ResellerFormData {
  name: string
  phone: string
  address: string
  businessInfo?: string
}

export function generateWhatsAppMessage(options: WhatsAppMessageOptions): string {
  const {
    productName,
    price,
    weight,
    quantity = 1,
    context,
    customerName,
    customerAddress,
    shippingCost,
    courier,
    estimatedDelivery,
  } = options

  const totalPrice =
    quantity > 1 ? `Rp ${(Number.parseInt(price.replace(/\D/g, "")) * quantity).toLocaleString()}` : price

  const baseMessage = `🛒 *PEMESANAN PRODUK MBAH WIRYO* 🛒\n\nHalo! Saya tertarik dengan produk Anda:`

  switch (context) {
    case "hero":
      return `${baseMessage}

📦 *Produk Unggulan*: ${productName}
💰 *Harga*: ${price} per pak
${weight ? `⚖️ *Berat/Isi*: ${weight} per pak` : ""}
${quantity > 1 ? `📊 *Jumlah*: ${quantity} pak\n💵 *Total*: ${totalPrice}` : ""}

Apakah produk ini masih tersedia? Mohon info lebih lanjut.

Terima kasih! 🙏`

    case "product-list":
      return `${baseMessage}

📦 *Produk*: ${productName}
💰 *Harga*: ${price} per pak
${weight ? `⚖️ *Berat/Isi*: ${weight} per pak` : ""}
${quantity > 1 ? `📊 *Jumlah Pesanan*: ${quantity} pak\n💵 *Total Harga*: ${totalPrice}` : ""}

Mohon konfirmasi ketersediaan dan cara pemesanan.

Terima kasih! 🚚`

    case "product-detail":
      return `${baseMessage}

📦 *Produk*: ${productName}
💰 *Harga*: ${price} per pak
${weight ? `⚖️ *Berat/Isi*: ${weight} per pak` : ""}
📊 *Jumlah Pesanan*: ${quantity} pak
💵 *Total Harga Produk*: ${totalPrice}

📍 *Alamat Pengiriman*:
${customerAddress || "[Alamat lengkap customer]"}

📞 *No. HP*: ${customerName ? `[Nomor HP ${customerName}]` : "[Nomor HP customer]"}

Mohon konfirmasi ketersediaan dan total biaya termasuk ongkir.

Terima kasih! 🚚`

    case "shipping":
      return `${baseMessage}

📦 *Produk*: ${productName}
💰 *Harga Produk*: ${price} per pak
${quantity > 1 ? `📊 *Jumlah*: ${quantity} pak\n💵 *Subtotal*: ${totalPrice}` : ""}

🚚 *Detail Pengiriman*:
${courier ? `• Kurir: ${courier}` : ""}
${shippingCost ? `• Ongkir: ${shippingCost}` : ""}
${estimatedDelivery ? `• Estimasi: ${estimatedDelivery}` : ""}

📍 *Alamat Tujuan*:
${customerAddress || "[Alamat lengkap tujuan]"}

Mohon konfirmasi total pembayaran dan cara transfer.

Terima kasih! 💳`

    case "reseller":
      return `🤝 *PENDAFTARAN RESELLER MBAH WIRYO* 🤝

Halo! Saya tertarik untuk menjadi reseller produk Mbah Wiryo.

👤 *Data Calon Reseller*:
• Nama: ${customerName || "[Nama lengkap]"}
• No. HP: [Nomor HP]
• Alamat: ${customerAddress || "[Alamat lengkap]"}

💼 *Informasi yang Dibutuhkan*:
• Syarat dan ketentuan menjadi reseller
• Harga khusus reseller
• Minimum order
• Sistem pembayaran
• Dukungan marketing

📝 *Pengalaman Bisnis*:
[Ceritakan pengalaman bisnis atau rencana penjualan]

Mohon informasi lengkap tentang program reseller.

Terima kasih atas kesempatannya! 💼`

    default:
      return `${baseMessage}

📦 *Produk*: ${productName}
💰 *Harga*: ${price}

Mohon informasi lebih lanjut tentang produk ini.

Terima kasih! 🙏`
  }
}

export function generateResellerWhatsAppMessage(formData: ResellerFormData): string {
  return `🤝 *PENDAFTARAN RESELLER MBAH WIRYO* 🤝

Halo! Saya tertarik untuk menjadi reseller produk Mbah Wiryo.

👤 *Data Calon Reseller*:
• Nama: ${formData.name}
• No. HP: ${formData.phone}
• Alamat: ${formData.address}

💼 *Informasi yang Dibutuhkan*:
• Syarat dan ketentuan menjadi reseller
• Harga khusus reseller
• Minimum order
• Sistem pembayaran
• Dukungan marketing

${formData.businessInfo ? `📝 *Informasi Tambahan*:\n${formData.businessInfo}\n\n` : ""}Mohon informasi lengkap tentang program reseller.

Terima kasih atas kesempatannya! 💼`
}

export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}
