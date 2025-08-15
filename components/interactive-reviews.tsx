"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquarePlus } from "lucide-react"
import ReviewStats from "./review-stats"
import ReviewList from "./review-list"
import ReviewForm from "./review-form"
import { getReviewsByProductId, getReviewStats, addReview, markReviewHelpful } from "@/lib/reviews"
import type { Review, ReviewStats as ReviewStatsType, ReviewFormData } from "@/lib/types/review"

interface InteractiveReviewsProps {
  productId: string
  productName: string
}

export default function InteractiveReviews({ productId, productName }: InteractiveReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStatsType>({
    totalReviews: 0,
    averageRating: 0,
    ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("reviews")

  useEffect(() => {
    loadReviews()
  }, [productId])

  const loadReviews = () => {
    const productReviews = getReviewsByProductId(productId)
    const productStats = getReviewStats(productId)
    setReviews(productReviews)
    setStats(productStats)
  }

  const handleSubmitReview = async (formData: ReviewFormData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newReview = addReview(productId, {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        rating: formData.rating,
        title: formData.title,
        comment: formData.comment,
        isVerifiedPurchase: false, // In real app, this would be determined by purchase history
      })

      // Reload reviews and stats
      loadReviews()

      // Reset form and hide it
      setShowReviewForm(false)
      setActiveTab("reviews")

      // Show success message (you could use a toast here)
      alert("Terima kasih! Ulasan Anda telah berhasil dikirim.")
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Terjadi kesalahan saat mengirim ulasan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMarkHelpful = (reviewId: string) => {
    const success = markReviewHelpful(reviewId)
    if (success) {
      loadReviews() // Reload to get updated helpful count
    }
  }

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <ReviewStats stats={stats} />

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="reviews">Ulasan ({stats.totalReviews})</TabsTrigger>
            <TabsTrigger value="write-review">Tulis Ulasan</TabsTrigger>
          </TabsList>

          {!showReviewForm && activeTab === "reviews" && (
            <Button
              onClick={() => {
                setShowReviewForm(true)
                setActiveTab("write-review")
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageSquarePlus className="w-4 h-4 mr-2" />
              Tulis Ulasan
            </Button>
          )}
        </div>

        <TabsContent value="reviews" className="space-y-6">
          <ReviewList reviews={reviews} onMarkHelpful={handleMarkHelpful} />
        </TabsContent>

        <TabsContent value="write-review" className="space-y-6">
          {showReviewForm || activeTab === "write-review" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-amber-900">Bagikan Pengalaman Anda</h3>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowReviewForm(false)
                    setActiveTab("reviews")
                  }}
                  className="text-amber-600 hover:text-amber-700"
                >
                  Batal
                </Button>
              </div>

              <ReviewForm
                productId={productId}
                productName={productName}
                onSubmit={handleSubmitReview}
                isSubmitting={isSubmitting}
              />
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquarePlus className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Bagikan Pengalaman Anda</h3>
              <p className="text-amber-600 mb-4">Bantu pelanggan lain dengan memberikan ulasan tentang produk ini</p>
              <Button onClick={() => setShowReviewForm(true)} className="bg-green-600 hover:bg-green-700 text-white">
                <MessageSquarePlus className="w-4 h-4 mr-2" />
                Mulai Menulis Ulasan
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
