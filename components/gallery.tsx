"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useBackground } from "./BackgroundContext"
import Lightbox from "@/components/lightbox"

type Category = {
  id: string
  name: string
  color: string
  logoUrl: string
  children?: Category[]
}

// Gallery item type
type GalleryItem = {
  id: number
  title: string
  mainCategory: string
  subCategory: string
  imageUrl: string
  date: string
}

const mainCategories: Category[] =[
  {
    id: "life",
    name: "日常",
    color: "bg-green-100 text-green-900",
    logoUrl: "",
    children: [
      {id: "friend", name: "フレンド", color: "", logoUrl: ""},
      {id: "myself", name: "自撮り", color: "", logoUrl: ""},
      {id: "view", name: "風景", color: "", logoUrl: ""}
    ]
  },
  {
    id: "mesugakissa",
    name: "めすがきっさロぅリぃ",
    color: "bg-pink-50 text-pink-900",
    logoUrl: "/Images/mesugakissa_logo.jpg?height=400&width=400",
    children: [
      {id: "hime", name: "結城ひめ", color: "", logoUrl: ""},
      {id: "sarena", name: "天河サレナ", color: "", logoUrl: ""},
    ]
  }
]

// gallery data
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "江ノ島1",
    mainCategory: "life",
    subCategory: "view",
    imageUrl: "/Images/ID1.png?height=400&width=600",
    date: "2025-03-06",
  },
  {
    id: 2,
    title: "江ノ島2",
    mainCategory: "life",
    subCategory: "view",
    imageUrl: "/Images/ID2.png?height=400&width=600",
    date: "2025-03-06",
  },
  {
    id: 3,
    title: "真冬三...姉妹？兄弟？",
    mainCategory: "life",
    subCategory: "friend",
    imageUrl: "/Images/ID3.png?height=400&width=600",
    date: "2025-03-06",
  },
  {
    id: 4,
    title: "No Title",
    mainCategory: "life",
    subCategory: "myself",
    imageUrl: "/Images/ID4.png?height=400&width=600",
    date: "2025-01-14",
  },
  {
    id: 5,
    title: "No Title",
    mainCategory: "life",
    subCategory: "myself",
    imageUrl: "/Images/ID5.png?height=400&width=600",
    date: "2025-01-14",
  },
  {
    id: 6,
    title: "まだなのかなぁ？",
    mainCategory: "life",
    subCategory: "myself",
    imageUrl: "/Images/ID6.png?height=400&width=600",
    date: "2025-01-15",
  },
  {
    id: 7,
    title: "No Title",
    mainCategory: "life",
    subCategory: "myself",
    imageUrl: "/Images/ID7.png?height=400&width=600",
    date: "2025-01-18",
  },
  {
    id: 8,
    title: "結城ひめ",
    mainCategory: "mesugakissa",
    subCategory: "hime",
    imageUrl: "/Images/ID8.png?height=400&width=600",
    date: "2025-02-19",
  },
  {
    id: 9,
    title: "結城ひめ",
    mainCategory: "mesugakissa",
    subCategory: "hime",
    imageUrl: "/Images/ID9.png?height=400&width=600",
    date: "2025-02-19",
  },
  {
    id: 10,
    title: "結城ひめ",
    mainCategory: "mesugakissa",
    subCategory: "hime",
    imageUrl: "/Images/ID10.png?height=400&width=600",
    date: "2025-02-19",
  },
  {
    id: 11,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: "sarena",
    imageUrl: "/Images/ID11.png?height=400&width=600",
    date: "2025-03-05",
  },
  {
    id: 12,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: "sarena",
    imageUrl: "/Images/ID12.png?height=400&width=600",
    date: "2025-03-05",
  },
  {
    id: 13,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: "sarena",
    imageUrl: "/Images/ID13.png?height=400&width=600",
    date: "2024-12-04",
  },
  {
    id: 14,
    title: "結城ひめ",
    mainCategory: "mesugakissa",
    subCategory: "hime",
    imageUrl: "/Images/ID14.png?height=400&width=600",
    date: "2024-12-04",
  },
  {
    id: 15,
    title: "結城ひめ",
    mainCategory: "mesugakissa",
    subCategory: "hime",
    imageUrl: "/Images/ID15.png?height=400&width=600",
    date: "2024-07-10",
  },
  {
    id: 16,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: "sarena",
    imageUrl: "/Images/ID16.png?height=400&width=600",
    date: "2024-10-30",
  },
  {
    id: 17,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: "sarena",
    imageUrl: "/Images/ID17.png?height=400&width=600",
    date: "2024-11-13",
  },
  {
    id: 18,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: "sarena",
    imageUrl: "/Images/ID18.png?height=400&width=600",
    date: "2024-11-28",
  },
]


export default function Gallery() {
  const [activeMainCategory, setActiveMainCategory] = useState<string | null>(null)
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null)
  //const [themeColor, setThemeColor] = useState("");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [, setVisibleItems] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const { setBackground } = useBackground();

  // Filter items based on selected category
  const filteredItems = galleryItems.filter((item) => {
    if (!activeMainCategory) return true
    if (!activeSubCategory) return item.mainCategory === activeMainCategory
    return item.mainCategory === activeMainCategory && item.subCategory === activeSubCategory
  })

  useEffect(() => {
    const rootElement = document.documentElement

    if (activeMainCategory) {
      const category = mainCategories.find((cat) => cat.id === activeMainCategory)
      if (category) {
        rootElement.classList.remove("bg-green-50", "bg-blue-50", "bg-amber-50", "bg-pink-50")

        switch (category.id) {
          case "life":
            rootElement.classList.add("bg-green-50")
            break
          case "mesugakissa":
            rootElement.classList.add("bg-pink-50")
            break
          default:
            rootElement.classList.add("bg-amber-50")
            break
        }

        //setThemeColor(category.color)
      }
    }
    else
    {
      rootElement.classList.remove("bg-green-50", "bg-blue-50", "bg-amber-50", "bg-pink-50")
      //setThemeColor("")
    }

    return () => {
      rootElement.classList.remove("bg-green-50", "bg-blue-50", "bg-amber-50", "bg-pink-50")
    }
  }, [activeMainCategory])

  useEffect(() => {
    if(observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-id"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(id))
          }
        })
      },
      {
        rootMargin: "200px",
        threshold: 0.1
      }
    )
  

    itemRefs.current.forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref)
      }
    })
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [filteredItems])

  const handleMainCategoryClick = (categoryId: string) => {
    if (activeMainCategory === categoryId) {
      setActiveMainCategory(null)
      setActiveSubCategory(null)
      setBackground("/Images/ID1.png?height=1080&width=1920")
    }
    else
    {
      setActiveMainCategory(categoryId)
      setActiveSubCategory(null)
      switch(categoryId)
      {
        case "mesugakissa":
          setBackground("/Images/mesugakissa_bg.png?height=1080&width=1920")
          break
        default:
          setBackground("/Images/ID1.png?height=1080&width=1920")
          break
      }

      
    }
  }

  const handleSubCategoryClick = (categoryId: string) => {
    setActiveSubCategory(categoryId === activeSubCategory ? null : categoryId)
  }



  const currentSubCategories = activeMainCategory
   ? mainCategories.find((cat) => cat.id === activeMainCategory)?.children || []
   : []

  const currentCategoryLogo = activeMainCategory
   ? mainCategories.find((cat) => cat.id ===activeMainCategory)?.logoUrl 
   : null

  return (
    <div className="space-y-8 transition=colors duration-300">
      {/* main category */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
          <Button
            variant={!activeMainCategory ? "default" : "outline"}
            onClick={() => {
              setActiveMainCategory(null)
              setActiveSubCategory(null)
            }}
            className={cn(
              "mb-2",
            )}
          >
            全て
          </Button>
          {mainCategories.map((category)=> (
            <Button
              key={category.id}
              variant={activeMainCategory === category.id ? "default" : "outline"}
              onClick={() => handleMainCategoryClick(category.id)}
              className={cn(
                "mb-2",
              )}
            >
              {category.name}
            </Button>
          ))}
      </div>

      {/* category logo and sub category*/}
      <AnimatePresence>
        {activeMainCategory && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* category logo */}
            {currentCategoryLogo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <div className="relative w-full max-w-2xl h-16 md:h-24">
                  <Image
                    src={currentCategoryLogo || "/placeholder.svg"}
                    alt={`${activeMainCategory} 로고`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                  />
                </div>
              </motion.div>
            )}

            {/* sub category filter */}
            {currentSubCategories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap justify-center gap-2 mb-8 overflow-hidden"
              >
                {currentSubCategories.map((subCategory) => (
                  <Button
                    key={subCategory.id}
                    variant={activeSubCategory === subCategory.id ? "default" : "outline"}
                    onClick={() => handleSubCategoryClick(subCategory.id)}
                    className={cn(
                      "px-3 py-1 text-sm",
                    )}
                  >
                    {subCategory.name}
                  </Button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* gallery grid */}
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
                <div className="relative aspect-[4/3] bg-muted/30">
                  <Image
                   src={item.imageUrl || "/placeholder.svg"}
                   alt={item.title}
                   fill
                   className="object-cover"
                   sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                   loading="lazy"
                   />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg">{item.title}</h3>
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

