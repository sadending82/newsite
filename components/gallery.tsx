"use client"

import { useEffect, useState} from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useBackground } from "./BackgroundContext"
import CategorySidebar from "./categorySidebar"
import Lightbox from "@/components/lightbox"
import { ChevronLeft, ChevronRight, ChevronDown, Calendar, Grid, List } from "lucide-react"
import { japaneseFont } from "@/components/fonts"
import { mainCategories, getSubCategoryNames } from "@/data/categories"
import { 
  galleryItems,
  sortGalleryItems,
  getAvailableMonths,
  getGalleryItemsByMonth,
  groupGalleryItemsByMonth,
  formatMonthName,
} from "@/data/galleryItem"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export default function Gallery() {
  const [activeMainCategory, setActiveMainCategory] = useState<string | null>(null)
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null)
  const [lightboxOpen, SetLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMonth, setSelectedMonth] = useState<{ year: number; month: number } | null>(null)
  const [groupByMonth, setGroupByMonth] = useState(false)
  const itemsPerPage = 12
  const { setBackground } = useBackground();

  const availableMonths = getAvailableMonths()

  const filteredItems = (() => {
    let items = galleryItems

    if (activeMainCategory) {
      items = items.filter((item) => {
        if (item.mainCategory !== activeMainCategory) return false
        if (activeSubCategory && !item.subCategories.includes(activeSubCategory)) return false
        return true
      })
    }

    if (selectedMonth) {
      items = getGalleryItemsByMonth(selectedMonth.year, selectedMonth.month).filter((item) => {
        if (!activeMainCategory) return true
        if (item.mainCategory !== activeMainCategory) return false
        if (activeSubCategory && !item.subCategories.includes(activeSubCategory)) return false
        return true
      })
    }

    return sortGalleryItems(items)
  })()

  // Filter items based on selected category
  const filteredAndSortedItems = galleryItems.filter((item) => {
    if (!activeMainCategory) return true

    if (item.mainCategory !== activeMainCategory) return false

    if (!activeSubCategory) return true

    return item.subCategories.includes(activeSubCategory)
  }).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const displayData = (
    groupByMonth ? (groupGalleryItemsByMonth(filteredItems).data) : filteredItems
  ).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const totalPages = Math.ceil(displayData.length / itemsPerPage)
  const paginatedItems = displayData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeMainCategory, activeSubCategory, selectedMonth, groupByMonth])

  const handleMainCategoryClick = (categoryId: string | null) => {
      setActiveMainCategory(categoryId)
      setActiveSubCategory(null)
      setBackground("/Images/ID1.png?height=1080&width=1920")
  }

  const handleSubCategoryClick = (categoryId: string | null) => {
    setActiveSubCategory(categoryId)
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

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    SetLightboxOpen(true)
  }

  const handleCloseLightbox = () => {
    SetLightboxOpen(false)
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handleMonthSelect = (year: number, month: number) => {
    if (selectedMonth?.year === year && selectedMonth?.month === month) {
      setSelectedMonth(null)
    } else {
      setSelectedMonth({year, month})
    }
  }

  const toggleGroupByMonth = () => {
    setGroupByMonth(!groupByMonth)
  }

  const currentSubCategories = activeMainCategory
   ? mainCategories.find((cat) => cat.id === activeMainCategory)?.children || []
   : []

  const currentCategoryLogo = activeMainCategory
   ? mainCategories.find((cat) => cat.id ===activeMainCategory)?.logoUrl 
   : null

  return (
    <>
      <CategorySidebar
        categories={mainCategories}
        activeMainCategory={activeMainCategory}
        activeSubCategory={activeSubCategory}
        onMainCategoryClick={handleMainCategoryClick}
        onSubCategoryClick={handleSubCategoryClick}
      />

      <div className="
      flex-1
      overflow-scroll
      [&::-webkit-scrollbar]:hidden
      transition=colors
      duration-300"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      >
        <main className="max-w-[90%] mx-auto px-4 py-12 md:px-8 lg:px-12 xl:max-w-[85%] 2xl:max-w-[80%]">
          <h1 className="text-3xl font-bold text-center mb-8">Gallery</h1>

          <div className={`flex flex-wrap justify-center items-center gap-4 mb-8 ${japaneseFont.className}`}>
            {/* 월별 필터 드롭다운 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {selectedMonth ? formatMonthName(selectedMonth.year, selectedMonth.month) : "All"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={`max-h-60 overflow-y-auto ${japaneseFont.className}`}>
                <DropdownMenuItem onClick={() => setSelectedMonth(null)}>
                  <span>All</span>
                </DropdownMenuItem>
                {availableMonths.map(({ year, month }) => (
                  <DropdownMenuItem key={`${year}-${month}`} onClick={() => handleMonthSelect(year, month)}>
                    <span>
                      {formatMonthName(year, month)}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* gallery grid */}
          <AnimatePresence>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${japaneseFont.className}`}>
              {paginatedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleImageClick(index)}
                >
                  <Card className="overflow-hidden h-full cursor-pointer" >
                    <div className="relative aspect-[4/3] bg-muted/30">
                      <Image
                      src={`/smallImages/ID${item.id}.png` || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                      decoding="async"
                      style={{objectFit:"contain"}}
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

          <div className={`text-center text-sm text-muted-foreground ${japaneseFont.className}`}>
            {filteredAndSortedItems.length} 個の写真の中、{(currentPage - 1) * itemsPerPage + 1} から {Math.min(currentPage * itemsPerPage, filteredAndSortedItems.length)} の写真を表示中

          </div>

          {
          lightboxOpen && paginatedItems.length > 0 && (
            <Lightbox image={paginatedItems[currentImageIndex]} isOpen={lightboxOpen}
            onClose={handleCloseLightbox}/>
          )}
        </main>
      </div>
    </>
  )
}

