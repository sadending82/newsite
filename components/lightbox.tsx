"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type GalleryItem = {
  id: number
  title: string
  mainCategory: string
  subCategories: string[]
  imageUrl: string
  date: string
}

type LightboxProps = {
  image: GalleryItem
  isOpen: boolean
  onClose: () => void
}

export default function Lightbox({ image, isOpen, onClose }: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (isOpen){

    setIsLoading(true)
    setLoadingProgress(0)

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (!isLoading && prev >= 100) {
          clearInterval(interval)
          return 100
        }
        if (isLoading) {
          const increment = Math.max(1, 10 * (1 - prev / 100))
          return Math.min(99, prev + increment)
        }
        return Math.min(100 ,prev + 10)
      })
    }, 300)

    return () => clearInterval(interval)
  }
  }, [isOpen, image, isLoading])

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden"
  //   }
  //   else {
  //     document.body.style.overflow = ""
  //   }

  //   return () => {
  //     document.body.style.overflow = ""
  //   }
  // }, [isOpen])

  useEffect(() => {
    if (!image) return

    const img = new window.Image()
    img.src = image.imageUrl
    img.onload = () => {
      const aspectRatio = img.width / img.height
      let width = Math.min(img.width, window.innerWidth * 0.9)
      let height = width / aspectRatio

      if (height > window.innerHeight * 0.9) {
        height = window.innerHeight * 0.9
        width = height * aspectRatio
      }

      setDimensions({ width, height })
    }
  }, [image])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleImageLoadingComplete = () => {
    setIsLoading(false)
  }

  if (!isOpen || !image) {
    return null
  }

  return (
    <div
     className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90"
     onClick={onClose}
    >
      <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
          onClick={onClose}
          aria-label="closeLightbox"
        >
          <X className="h-6 w-6 text=white" />
        </Button>
        
        <div className="relative">
          {loadingProgress < 100 && (
            <div className="apsolute inset=0 flex-col items-center justify-center
             z-10 bg-black/50 rounded-md">
              <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-white transition-all duration-300 ease-out"
                  style={{width:`${loadingProgress}`}}
                />
              </div>
              <p className="text-white text-sm">{`${Math.round(loadingProgress)}%`}</p>
             </div>
          )}

          <Image
            src={image.imageUrl || "/placeholder.svg"}
            alt={image.title}
            width={dimensions.width}
            height={dimensions.height}
            className="max-w-full max-h-[90vh] object-contain"
            priority
            onLoadingComplete={handleImageLoadingComplete}
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white py-2 px-4 rounded">
            {image.title}
          </div>
          </div>
      </div>
      <Button variant="secondary" className="absolute bottom-4 right-4" onClick={onClose}>
        閉じる
      </Button>
    </div>
  )
}