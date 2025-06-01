
export type Category = {
    id: string
    name: string
    color: string
    logoUrl: string
    children?: Category[]
  }

  // Gallery item type
  export type GalleryItem = {
    id: number
    title: string
    mainCategory: string
    subCategories: string[]
    imageUrl: string
    date: string
  }

  