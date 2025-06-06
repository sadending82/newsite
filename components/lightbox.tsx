"use client"

import { useEffect, useState, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { japaneseFont } from "@/components/fonts"
import ApiImage from "./apiImage"

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
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const lightboxRef = useRef<HTMLDivElement>(null)

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
    if (!isOpen) return

    const updateLightboxPosition = () => {
      if (!lightboxRef.current) return

      const viewportTop = window.scrollY
      const viewportHeight = window.innerHeight
      //const viewportCenter = viewportTop + viewportHeight / 2

      lightboxRef.current.style.position = "absolute"
      lightboxRef.current.style.top = `${viewportTop}px`
      lightboxRef.current.style.height = `${viewportHeight}px`
      lightboxRef.current.style.display = "flex"
      lightboxRef.current.style.alignItems = "center"
      lightboxRef.current.style.justifyContent = "center"
    }

    updateLightboxPosition()

    window.addEventListener("scroll", updateLightboxPosition, {passive: true})
    window.addEventListener("resize", updateLightboxPosition, {passive: true})

    return () => {
      window.removeEventListener("scroll", updateLightboxPosition)
      window.removeEventListener("resize", updateLightboxPosition)
    }
  }, [isOpen])

  useEffect(() => {
    if (!image) return

    const img = new window.Image()
    img.src = image.imageUrl
    img.onload = () => {
      setIsLoading(true)
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
    ref={lightboxRef}
     style = {{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      zIndex: 9999,
      pointerEvents: "auto",
     }}
     onClick={onClose}
    >
      <div 
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
          onClick={onClose}
          aria-label="closeLightbox"
        >
          <X style={{width: "12px", height: "12px", color: "white"}} />
        </Button>
        
        <div style={{ position: "relative"}}>
          {isLoading && (
            <div 
              style ={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "6px"
              }}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-t-transparent border-white"/>
            </div>
          )}

          <ApiImage
            imageName={image.imageUrl}
            alt={image.title}
            width={dimensions.width}
            height={dimensions.height}
            className="max-w-full max-h-[90vh] object-contain"
            priority
            onLoadingComplete={handleImageLoadingComplete}
            placeholder="empty"
          />
          <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50
           text-white py-2 px-4 rounded ${japaneseFont.className}`}>
            {image.title}
          </div>
        </div>
      </div>
      <Button variant="secondary" className={`absolute bottom-4 right-4 ${japaneseFont.className}`} onClick={onClose}>
        閉じる
      </Button>
    </div>
  )
}