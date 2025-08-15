"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Star, Upload, X } from "lucide-react"
import type { ReviewFormData } from "@/lib/types/review"

interface ReviewFormProps {
  productId: string
  productName: string
  onSubmit: (data: ReviewFormData) => void
  isSubmitting?: boolean
}

export default function ReviewForm({ productId, productName, onSubmit, isSubmitting = false }: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    customerName: "",
    customerEmail: "",
    rating: 0,
    title: "",
    comment: "",
    images: [],
  })
  const [hoveredRating, setHoveredRating] = useState(0)
  const [errors, setErrors] = useState<Partial<ReviewFormData>>({})

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
    setErrors((prev) => ({ ...prev, rating: undefined }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...files].slice(0, 3), // Max 3 images
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ReviewFormData> = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Nama harus diisi"
    }

    if (formData.rating === 0) {
      newErrors.rating = "Rating harus dipilih"
    }

    if (!formData.title.trim()) {
      newErrors.title = "Judul ulasan harus diisi"
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Komentar harus diisi"
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = "Komentar minimal 10 karakter"
    }

    if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Format email tidak valid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerEmail: "",
      rating: 0,
      title: "",
      comment: "",
      images: [],
    })
    setErrors({})
    setHoveredRating(0)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-amber-900">Tulis Ulasan untuk {productName}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <Label className="text-amber-900">Rating *</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || formData.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-amber-600">
                {formData.rating > 0 && <>{formData.rating} dari 5 bintang</>}
              </span>
            </div>
            {errors.rating && <p className="text-sm text-red-600">{errors.rating}</p>}
          </div>

          {/* Customer Name */}
          <div className="space-y-2">
            <Label htmlFor="customerName" className="text-amber-900">
              Nama *
            </Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData((prev) => ({ ...prev, customerName: e.target.value }))}
              placeholder="Masukkan nama Anda"
              className={errors.customerName ? "border-red-500" : ""}
            />
            {errors.customerName && <p className="text-sm text-red-600">{errors.customerName}</p>}
          </div>

          {/* Customer Email (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="customerEmail" className="text-amber-900">
              Email (Opsional)
            </Label>
            <Input
              id="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData((prev) => ({ ...prev, customerEmail: e.target.value }))}
              placeholder="email@example.com"
              className={errors.customerEmail ? "border-red-500" : ""}
            />
            {errors.customerEmail && <p className="text-sm text-red-600">{errors.customerEmail}</p>}
          </div>

          {/* Review Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-amber-900">
              Judul Ulasan *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Ringkas pengalaman Anda dalam satu kalimat"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Review Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-amber-900">
              Ulasan Anda *
            </Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
              placeholder="Ceritakan pengalaman Anda dengan produk ini..."
              rows={4}
              className={errors.comment ? "border-red-500" : ""}
            />
            <p className="text-xs text-amber-600">{formData.comment.length}/500 karakter</p>
            {errors.comment && <p className="text-sm text-red-600">{errors.comment}</p>}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-amber-900">Foto Produk (Opsional, maks 3 foto)</Label>
            <div className="space-y-3">
              {/* Upload Button */}
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("images")?.click()}
                  disabled={(formData.images?.length || 0) >= 3}
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Foto
                </Button>
                <span className="text-xs text-amber-600">{formData.images?.length || 0}/3 foto</span>
              </div>

              {/* Image Preview */}
              {formData.images && formData.images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white">
              {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isSubmitting}
              className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
