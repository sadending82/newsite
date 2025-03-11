"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Lightbox from "@/components/lightbox"


// Gallery item type
type GalleryItem = {
  id: number
  title: string
  category: string
  imageUrl: string
  date: string
}

// Sample gallery data
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "江ノ島1",
    category: "日常",
    imageUrl: "/Images/ID1.png?height=400&width=600",
    date: "2025-03-06",
  },
  {
    id: 2,
    title: "江ノ島2",
    category: "日常",
    imageUrl: "/Images/ID2.png?height=400&width=600",
    date: "2025-03-06",
  },
  {
    id: 3,
    title: "真冬三...姉妹？兄弟？",
    category: "日常",
    imageUrl: "/Images/ID3.png?height=400&width=600",
    date: "2025-03-06",
  },
  {
    id: 4,
    title: "No Title",
    category: "日常",
    imageUrl: "/Images/ID4.png?height=400&width=600",
    date: "2025-01-14",
  },
  {
    id: 5,
    title: "No Title",
    category: "日常",
    imageUrl: "/Images/ID5.png?height=400&width=600",
    date: "2025-01-14",
  },
  {
    id: 6,
    title: "まだなのかなぁ？",
    category: "日常",
    imageUrl: "/Images/ID6.png?height=400&width=600",
    date: "2025-01-15",
  },
  {
    id: 7,
    title: "No Title",
    category: "日常",
    imageUrl: "/Images/ID7.png?height=400&width=600",
    date: "2025-01-18",
  },
  {
    id: 8,
    title: "のんべんだらり",
    category: "イベント",
    imageUrl: "/Images/ID8.png?height=400&width=600",
    date: "2024-10-11",
  },
]


// Get unique categories
const categories = ["全て", ...Array.from(new Set(galleryItems.map((item) => item.category)))]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("全て")
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "全て" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

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
              <Card className="overflow-hidden h-full cursor-pointer" onClick={() => setSelectedImage(item)}>
                <div className="relative aspect-[4/3]">
                  <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {selectedImage && <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  )
}

