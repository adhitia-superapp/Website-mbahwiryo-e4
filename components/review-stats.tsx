"use client"

import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"
import type { ReviewStatsType } from "@/lib/types/review"

interface ReviewStatsProps {
  stats: ReviewStatsType
}

export default function ReviewStats({ stats }: ReviewStatsProps) {
  if (stats.totalReviews === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">Rating & Ulasan</h3>
        <p className="text-amber-600">Belum ada ulasan untuk produk ini.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-amber-900 mb-4">Rating & Ulasan</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-amber-900 mb-2">{stats.averageRating}</div>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(stats.averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-amber-600">Berdasarkan {stats.totalReviews} ulasan</p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingBreakdown[rating as keyof typeof stats.ratingBreakdown]
            const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0

            return (
              <div key={rating} className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm text-amber-700">{rating}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                </div>
                <Progress value={percentage} className="flex-1 h-2" />
                <span className="text-sm text-amber-600 w-8">{count}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
