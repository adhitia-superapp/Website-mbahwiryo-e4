import type { Review, ReviewStats } from "./types/review"

// Mock data untuk demo - dalam implementasi nyata ini akan dari database
const mockReviews: Review[] = [
  {
    id: "1",
    productId: "singkong-keju-original",
    customerName: "Sari Dewi",
    rating: 5,
    title: "Enak banget! Anak-anak suka",
    comment:
      "Singkong kejunya enak banget, teksturnya pas, kejunya melimpah. Anak-anak langsung suka dan minta lagi. Pasti akan order lagi!",
    isVerifiedPurchase: true,
    helpfulCount: 12,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    productId: "singkong-keju-original",
    customerName: "Budi Santoso",
    rating: 4,
    title: "Praktis dan enak",
    comment:
      "Produk frozen yang praktis, tinggal goreng langsung jadi. Rasanya enak, cuma agak asin menurut saya. Overall recommended!",
    isVerifiedPurchase: true,
    helpfulCount: 8,
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-10T14:20:00Z",
  },
  {
    id: "3",
    productId: "singkong-keju-original",
    customerName: "Maya Putri",
    rating: 5,
    title: "Kualitas premium!",
    comment:
      "Bener-bener premium quality! Singkongnya fresh, kejunya berkualitas. Packaging juga rapi dan aman. Highly recommended untuk yang suka camilan sehat.",
    isVerifiedPurchase: true,
    helpfulCount: 15,
    createdAt: "2024-01-08T09:15:00Z",
    updatedAt: "2024-01-08T09:15:00Z",
  },
  {
    id: "4",
    productId: "kroket-frozen",
    customerName: "Ahmad Rizki",
    rating: 4,
    title: "Kroket enak, porsi pas",
    comment:
      "Kroketnya enak, isinya padat dan berasa. Cocok buat cemilan keluarga. Cuma harganya agak mahal ya, tapi sebanding dengan kualitas.",
    isVerifiedPurchase: true,
    helpfulCount: 6,
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
]

export function getReviewsByProductId(productId: string): Review[] {
  return mockReviews.filter((review) => review.productId === productId)
}

export function getReviewStats(productId: string): ReviewStats {
  const reviews = getReviewsByProductId(productId)

  if (reviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    }
  }

  const totalReviews = reviews.length
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / totalReviews

  const ratingBreakdown = reviews.reduce(
    (breakdown, review) => {
      breakdown[review.rating as keyof typeof breakdown]++
      return breakdown
    },
    { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  )

  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    ratingBreakdown,
  }
}

export function addReview(
  productId: string,
  reviewData: Omit<Review, "id" | "productId" | "helpfulCount" | "createdAt" | "updatedAt">,
): Review {
  const newReview: Review = {
    id: Date.now().toString(),
    productId,
    ...reviewData,
    helpfulCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockReviews.push(newReview)
  return newReview
}

export function markReviewHelpful(reviewId: string): boolean {
  const review = mockReviews.find((r) => r.id === reviewId)
  if (review) {
    review.helpfulCount++
    review.updatedAt = new Date().toISOString()
    return true
  }
  return false
}
