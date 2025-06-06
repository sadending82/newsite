"use client"

import { useState, useEffect } from "react"
import { getCachedImageUrl } from "@/lib/imageApi"

export function useImageUrl(imageName: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchUrl = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const url = await getCachedImageUrl(imageName)
        
        console.log(url)

        if (isMounted) {
          if (url) {
            setImageUrl(url)
            setError(null)
          } else {
            setError("can not load image.")
          }
          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "unknown error")
          setIsLoading(false)
        }
      }
    }

    if (imageName) {
      fetchUrl()
    } else {
      setIsLoading(false)
      setError("imageName is not exist.")
    }

    return () => {
      isMounted = false
    }
  }, [imageName])

  return { imageUrl, isLoading, error }
}
