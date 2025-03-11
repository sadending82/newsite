"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type LightboxProps = {
  image: {
    title: string
    imageUrl: string
  } | null
  onClose: () => void
}

export default function Lightbox({ image, onClose }: LightboxProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

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

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  if (!image) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        <Image
          src={image.imageUrl || "/placeholder.svg"}
          alt={image.title}
          width={dimensions.width}
          height={dimensions.height}
          className="max-w-full max-h-[90vh] object-contain"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white py-2 px-4 rounded">
          {image.title}
        </div>
      </div>
      <Button variant="secondary" className="absolute bottom-4 right-4" onClick={onClose}>
        閉じる
      </Button>
    </div>
  )
}