"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Gallery item type
type GalleryItem = {
  id: number
  title: string
  category: string
  imageUrl: string
}

// Sample gallery data
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "자연 풍경",
    category: "자연",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "도시 야경",
    category: "도시",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "산 풍경",
    category: "자연",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "현대 건축물",
    category: "건축",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "해변 일몰",
    category: "자연",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "도시 거리",
    category: "도시",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 7,
    title: "고전 건축물",
    category: "건축",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 8,
    title: "공원 전경",
    category: "자연",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 9,
    title: "도시 스카이라인",
    category: "도시",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 10,
    title: "현대 인테리어",
    category: "건축",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 11,
    title: "동물 사진",
    category: "동물",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 12,
    title: "야생 동물",
    category: "동물",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

// Get unique categories
const categories = ["전체", ...Array.from(new Set(galleryItems.map((item) => item.category)))]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("전체")

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "전체" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="mb-2"
          >
            {category}
          </Button>
        ))}
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden h-full">
                <div className="relative aspect-[4/3]">
                  <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}

