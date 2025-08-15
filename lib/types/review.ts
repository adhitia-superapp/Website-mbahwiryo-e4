export interface Review {
  id: string
  productId: string
  customerName: string
  customerEmail?: string
  rating: number
  title: string
  comment: string
  images?: string[]
  isVerifiedPurchase: boolean
  helpfulCount: number
  createdAt: string
  updatedAt: string
}

export interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingBreakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export interface ReviewFormData {
  customerName: string
  customerEmail?: string
  rating: number
  title: string
  comment: string
  images?: File[]
}
