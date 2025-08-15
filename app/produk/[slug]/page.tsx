import { notFound } from "next/navigation"
import { getProductBySlug, getRelatedProducts } from "@/lib/products"
import ProductDetailClient from "@/components/product-detail-client"
import type { Metadata } from "next"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan - Mbah Wiryo",
    }
  }

  return {
    title: `${product.name} - Mbah Wiryo`,
    description: product.shortDescription,
    keywords: product.tags.join(", "),
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [
        {
          url: product.images[0] || "/placeholder.svg",
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.id)

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
