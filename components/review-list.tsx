"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ThumbsUp, Calendar, CheckCircle } from "lucide-react"
import type { Review } from "@/lib/types/review"

interface ReviewListProps {
  reviews: Review[]
  onMarkHelpful?: (reviewId: string) => void
}

type SortOption = "newest" | "oldest" | "highest" | "lowest" | "helpful"
type FilterOption = "all" | "5" | "4" | "3" | "2" | "1" | "verified"

export default function ReviewList({ reviews, onMarkHelpful }: ReviewListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [filterBy, setFilterBy] = useState<FilterOption>("all")
  const [markedHelpful, setMarkedHelpful] = useState<Set<string>>(new Set())

  const handleMarkHelpful = (reviewId: string) => {
    if (!markedHelpful.has(reviewId)) {
      setMarkedHelpful((prev) => new Set([...prev, reviewId]))
      onMarkHelpful?.(reviewId)
    }
  }

  const filteredAndSortedReviews = reviews
    .filter((review) => {
      if (filterBy === "all") return true
      if (filterBy === "verified") return review.isVerifiedPurchase
      return review.rating === Number.parseInt(filterBy)
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "highest":
          return b.rating - a.rating
        case "lowest":
          return a.rating - b.rating
        case "helpful":
          return b.helpfulCount - a.helpfulCount
        default:
          return 0
      }
    })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-amber-600">Belum ada ulasan untuk produk ini.</p>
        <p className="text-sm text-amber-500 mt-2">Jadilah yang pertama memberikan ulasan!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-amber-900">Filter:</span>
          <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Ulasan</SelectItem>
              <SelectItem value="5">5 Bintang</SelectItem>
              <SelectItem value="4">4 Bintang</SelectItem>
              <SelectItem value="3">3 Bintang</SelectItem>
              <SelectItem value="2">2 Bintang</SelectItem>
              <SelectItem value="1">1 Bintang</SelectItem>
              <SelectItem value="verified">Pembelian Terverifikasi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium text-amber-900">Urutkan:</span>
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="oldest">Terlama</SelectItem>
              <SelectItem value="highest">Rating Tertinggi</SelectItem>
              <SelectItem value="lowest">Rating Terendah</SelectItem>
              <SelectItem value="helpful">Paling Membantu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews Count */}
      <div className="text-sm text-amber-600">
        Menampilkan {filteredAndSortedReviews.length} dari {reviews.length} ulasan
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredAndSortedReviews.map((review) => (
          <Card key={review.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-amber-900">{review.customerName}</h4>
                      {review.isVerifiedPurchase && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Pembelian Terverifikasi
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-amber-600">{review.rating}/5</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-amber-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                </div>

                {/* Review Title */}
                <h5 className="font-medium text-amber-900 text-lg">{review.title}</h5>

                {/* Review Content */}
                <p className="text-amber-700 leading-relaxed">{review.comment}</p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`Review image ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                      />
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkHelpful(review.id)}
                    disabled={markedHelpful.has(review.id)}
                    className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                  >
                    <ThumbsUp className={`w-4 h-4 mr-1 ${markedHelpful.has(review.id) ? "fill-current" : ""}`} />
                    {markedHelpful.has(review.id) ? "Terima kasih!" : "Membantu"}
                    {review.helpfulCount > 0 && (
                      <span className="ml-1">({review.helpfulCount + (markedHelpful.has(review.id) ? 1 : 0)})</span>
                    )}
                  </Button>

                  <div className="text-xs text-amber-500">ID: {review.id}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedReviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-amber-600">Tidak ada ulasan yang sesuai dengan filter yang dipilih.</p>
        </div>
      )}
    </div>
  )
}
