"use client"

import { useState } from "react"
import Image from "next/image"
import { useImageUrl } from "@/hooks/use-image-url"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"

type ApiImageProps = {
    imageName: string
    alt: string
    className?: string
    width?: number
    height?: number
    priority?: boolean
    placeholder?: PlaceholderValue
    onLoad?: () => void
    onLoadingComplete?: () => void
}

export default function ApiImage({
    imageName,
    alt,
    className,
    width,
    height,
    priority = false,
    placeholder = "empty",
    onLoad,
    onLoadingComplete,
}: ApiImageProps) {
    const [imageLoaded, setImageLoaded] = useState(false)

    const { imageUrl} = useImageUrl(imageName)

    const handleLoad = () => {
        setImageLoaded(true)
        onLoad?.()
    }

    return (
        <div className="relative">
          {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse rounded" />}
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={alt}
            className={className}
            width = {width}
            height = {height}
            priority={priority}
            onLoad={handleLoad}
            onLoadingComplete={onLoadingComplete}
            placeholder={placeholder}
            style={{
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
        </div>
      )
}