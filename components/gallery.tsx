"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useBackground } from "./BackgroundContext"
import Lightbox from "@/components/lightbox"
import {ChevronLeft, ChevronRight} from "lucide-react"

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
  subCategory: string[]
  imageUrl: string
  date: string
}

const mainCategories: Category[] =[
  {
    id: "mesugakissa",
    name: "めすがきっさロぅリぃ",
    color: "bg-pink-300 text-pink-900",
    logoUrl: "",
    children: [
      {id: "hime", name: "ひめ", color: "", logoUrl: ""}, //
      {id: "sarena", name: "天河サレナ", color: "", logoUrl: ""}, //
      {id: "meimeime", name: "めいめいはせっと", color: "", logoUrl: ""}, //
      {id: "yusurin", name: "ゆすりん", color: "", logoUrl: ""}, //
      {id: "nagi", name: "薙。", color: "", logoUrl: ""}, //
      {id: "firanty", name: "Firanty", color: "", logoUrl: ""}, //
      {id: "wagiri", name: "わぎり", color: "", logoUrl: ""}, //
      {id: "rurio", name: "るりお君", color: "", logoUrl: ""}, 
      {id: "muu", name: "むぅ", color: "", logoUrl: ""}, //
      {id: "yayo", name: "やよちゃん", color: "", logoUrl: ""},
      {id: "tococo", name: "とここ", color: "", logoUrl: ""},
      {id: "kiruto", name: "キルト", color: "", logoUrl: ""},
      {id: "ganmon", name: "がんもん", color: "", logoUrl: ""},
      {id: "sutoai", name: "すとあい", color: "", logoUrl: ""},
      {id: "jyonko", name: "あまちじょんこ", color: "", logoUrl: ""},
      {id: "miyasaka", name: "宮坂稲荷", color:"", logoUrl: ""} //
    ]
  }
]

// gallery data
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategory: ["hime",],
    imageUrl: "/Images/ID1.png",
    date: "2025-02-19",
  },
  {
    id: 2,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategory: ["hime",],
    imageUrl: "/Images/ID2.png",
    date: "2025-02-19",
  },
  {
    id: 3,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategory: ["hime",],
    imageUrl: "/Images/ID3.png",
    date: "2025-02-19",
  },
  {
    id: 4,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: ["sarena",],
    imageUrl: "/Images/ID4.png",
    date: "2025-03-05",
  },
  {
    id: 5,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: ["sarena",],
    imageUrl: "/Images/ID5.png",
    date: "2025-03-05",
  },
  {
    id: 6,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: ["sarena",],
    imageUrl: "/Images/ID6.png",
    date: "2024-12-04",
  },
  {
    id: 7,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategory: ["hime",],
    imageUrl: "/Images/ID7.png",
    date: "2024-12-04",
  },
  {
    id: 8,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategory: ["hime",],
    imageUrl: "/Images/ID8.png",
    date: "2024-07-10",
  },
  {
    id: 9,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: ["sarena",],
    imageUrl: "/Images/ID9.png",
    date: "2024-10-30",
  },
  {
    id: 10,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: ["sarena",],
    imageUrl: "/Images/ID10.png",
    date: "2024-11-13",
  },
  {
    id: 11,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: ["sarena",],
    imageUrl: "/Images/ID11.png",
    date: "2024-11-28",
  },
  {
    id: 12,
    title: "めいめいはせっと",
    mainCategory: "mesugakissa",
    subCategory: ["meimeime",],
    imageUrl: "/Images/ID12.png",
    date: "2025-03-05",
  },
  {
    id: 13,
    title: "ゆすりん",
    mainCategory: "mesugakissa",
    subCategory: ["yusurin",],
    imageUrl: "/Images/ID13.png",
    date: "2025-03-05",
  },
  {
    id: 14,
    title: "ゆすりん",
    mainCategory: "mesugakissa",
    subCategory: ["yusurin",],
    imageUrl: "/Images/ID14.png",
    date: "2025-03-05",
  },
  {
    id: 15,
    title: "薙。",
    mainCategory: "mesugakissa",
    subCategory: ["nagi",],
    imageUrl: "/Images/ID15.png",
    date: "2025-03-05",
  },
  {
    id: 16,
    title: "Firanty",
    mainCategory: "mesugakissa",
    subCategory: ["firanty",],
    imageUrl: "/Images/ID16.png",
    date: "2025-03-05",
  },
  {
    id: 17,
    title: "Firanty",
    mainCategory: "mesugakissa",
    subCategory: ["firanty",],
    imageUrl: "/Images/ID17.png",
    date: "2025-03-05",
  },
  {
    id: 18,
    title: "わぎり",
    mainCategory: "mesugakissa",
    subCategory: ["wagiri",],
    imageUrl: "/Images/ID18.png",
    date: "2025-03-05",
  },
  {
    id: 19,
    title: "わぎり",
    mainCategory: "mesugakissa",
    subCategory: ["wagiri",],
    imageUrl: "/Images/ID19.png",
    date: "2025-03-05",
  },
  {
    id: 20,
    title: "むぅ",
    mainCategory: "mesugakissa",
    subCategory: ["muu",],
    imageUrl: "/Images/ID20.png",
    date: "2025-03-05",
  },
  {
    id: 21,
    title: "宮坂稲荷",
    mainCategory: "mesugakissa",
    subCategory: ["miyasaka",],
    imageUrl: "/Images/ID21.png",
    date: "2025-03-05",
  },
  {
    id: 22,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: ["sarena",],
    imageUrl: "/Images/ID22.png",
    date: "2025-03-12",
  },
  {
    id: 23,
    title: "やよちゃん",
    mainCategory: "mesugakissa",
    subCategory: ["yayo",],
    imageUrl: "/Images/ID23.png",
    date: "2025-03-12",
  },
  {
    id: 24,
    title: "るりお君",
    mainCategory: "mesugakissa",
    subCategory: ["rurio",],
    imageUrl: "/Images/ID24.png",
    date: "2025-03-12",
  },
  {
    id: 25,
    title: "るりお君",
    mainCategory: "mesugakissa",
    subCategory: ["rurio",],
    imageUrl: "/Images/ID25.png",
    date: "2025-03-12",
  },
  {
    id: 26,
    title: "とここ",
    mainCategory: "mesugakissa",
    subCategory: ["tococo",],
    imageUrl: "/Images/ID26.png",
    date: "2025-03-12",
  },
  {
    id: 27,
    title: "むぅ",
    mainCategory: "mesugakissa",
    subCategory: ["muu",],
    imageUrl: "/Images/ID27.png",
    date: "2025-03-12",
  },
  {
    id: 28,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategory: ["sarena",],
    imageUrl: "/Images/ID28.png",
    date: "2025-03-12",
  },
  {
    id: 29,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategory: ["hime",],
    imageUrl: "/Images/ID29.png",
    date: "2025-03-12",
  },
  {
    id: 30,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategory: ["hime",],
    imageUrl: "/Images/ID30.png",
    date: "2025-03-12",
  },
  {
    id: 31,
    title: "キルト",
    mainCategory: "mesugakissa",
    subCategory: ["kiruto",],
    imageUrl: "/Images/ID31.png",
    date: "2025-02-12",
  },
  {
    id: 32,
    title: "あまちじょんこ",
    mainCategory: "mesugakissa",
    subCategory: ["jyonko",],
    imageUrl: "/Images/ID32.png",
    date: "2025-02-12",
  },
  {
    id: 33,
    title: "がんもん",
    mainCategory: "mesugakissa",
    subCategory: ["ganmon",],
    imageUrl: "/Images/ID33.png",
    date: "2025-02-12",
  },
  {
    id: 34,
    title: "すとあい",
    mainCategory: "mesugakissa",
    subCategory: ["sutoai",],
    imageUrl: "/Images/ID34.png",
    date: "2025-02-19",
  },
]


export default function Gallery() {
  const [activeMainCategory, setActiveMainCategory] = useState<string | null>(null)
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null)
  //const [themeColor, setThemeColor] = useState("");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const { setBackground } = useBackground();

  // Filter items based on selected category
  const filteredAndSortedItems = galleryItems.filter((item) => {
    if (!activeMainCategory) return true

    if (item.mainCategory !== activeMainCategory) return false

    if (!activeSubCategory) return true

    return item.subCategory.includes(activeSubCategory)
  })
  .sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage)
  const paginatedItems = filteredAndSortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeMainCategory, activeSubCategory])

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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
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
            全カテゴリー
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
          {paginatedItems.map((item) => (
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
                   src={`/smallImages/ID${item.id}.png` || "/placeholder.svg"}
                   alt={item.title}
                   fill
                   className="object-cover"
                   sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                   loading="lazy"
                   decoding="async"
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

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className= {currentPage === 1 ? "text-muted-foreground cursor-not-allowed" : "text-primary"}
            variant={currentPage === 1 ? "default" : "outline"}
            aria-label="Prev"
          >
            <ChevronLeft className="h-5 w-5"/>
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages}, (_, i) => i + 1).map((page) => {
              if (page ===1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                return (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    //className={currentPage === page ? "text-primary-foreground" : ""}
                    variant={currentPage === page ? "default" : "outline"}
                  >
                    {page}
                  </Button>
                )
              }

              if (
                (page === currentPage - 3 && currentPage > 3) ||
                (page === currentPage + 3 && currentPage < totalPages - 2)
              ) {
                return (
                  <span key={page} className="px-1">
                    ...
                  </span>
                )
              }

              return null
            })}
          </div>

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className= {currentPage === totalPages ? "text-muted-foreground cursor-not-allowed" : "primary"}
            variant={currentPage === totalPages ? "default" : "outline"}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5"/>
          </Button>
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        {filteredAndSortedItems.length}個の写真の中、{(currentPage - 1) * itemsPerPage + 1}から
        {Math.min(currentPage * itemsPerPage, filteredAndSortedItems.length)}の写真を表示中
      </div>

      {selectedImage && <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  )
}

