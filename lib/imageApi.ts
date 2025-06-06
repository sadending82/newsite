export const IMAGE_API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_IMAGE_API_URL,
}

export type ImageResponse = {
    name: string
    url: string
}

export const getAllImageNames = async (): Promise<string[] | null> => {
    try {
        const response = await fetch(`${IMAGE_API_CONFIG.baseUrl}/images`)

        if(!response.ok) {
            console.error(`Failed to get image list: ${response.status} ${response.statusText}`)
            return null
        }

        const imageNames: string[] = await response.json()
        return imageNames
    } catch (error) {
        console.error("Error fetching image list:", error)
        return null
    }
}

export const getImageSignedUrl = async (imageName: string): Promise<string | null> => {
    try {
        const response = await fetch(`${IMAGE_API_CONFIG.baseUrl}/${encodeURIComponent(imageName)}`)
        
        if (!response.ok) {
            console.error(`Failed to get image URL: ${response.status} ${response.statusText}, ${IMAGE_API_CONFIG.baseUrl} ${imageName}`)
            return null
        }

        const data: ImageResponse = await response.json()
        return data.url
    } catch (error) {
        console.error("Error fetching image URL:", error)
        return null
    }
}

class ImageUrlCache {
    private cache = new Map<string, { url: string; timestamp: number }>()
    private readonly CACHE_DURATION = 10 * 60 * 1000 // 10min

    set(imageName: string, url: string) {
        this.cache.set(imageName, {
            url,
            timestamp: Date.now(),
        })
    }

    get(imageName: string): string | null {
        const cached = this.cache.get(imageName)
        if (!cached) return null

        if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
            this.cache.delete(imageName)
            return null
        }

        return cached.url
    }

    clear() {
        this.cache.clear()
    }
}

export const urlCache = new ImageUrlCache()

export const getCachedImageUrl = async (imageName: string): Promise<string | null> => {
    const cached = urlCache.get(imageName)
    if (cached) {
        return cached
    }

    const url = await getImageSignedUrl(imageName)
    if (url) {
        urlCache.set(imageName, url)
        return url
    }

    return null
}