"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Category } from "@/types/gallery"
import { getMainCategoryBySubCategoryId } from "@/data/categories"
import { japaneseFont } from "./fonts"


type CategorySidebarProps = {
    categories: Category[]
    activeMainCategory: string | null
    activeSubCategory: string | null
    onMainCategoryClick: (categoryId: string | null) => void
    onSubCategoryClick: (categoryId: string | null) => void
}

export default function CategorySidebarProps({
    categories,
    activeMainCategory,
    activeSubCategory,
    onMainCategoryClick,
    onSubCategoryClick,
}: CategorySidebarProps) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([])
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) =>
            prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
          )
    }

    const handleMainCategoryClick = (categoryId: string) => {
        onMainCategoryClick(categoryId)
        onSubCategoryClick(null)

        if (!expandedCategories.includes(categoryId)) {
            setExpandedCategories((prev) => [...prev, categoryId])
        } 

    }

    const handleSubCategoryClick = (categoryId: string) => {
        if (activeSubCategory === categoryId) {
            onSubCategoryClick(null)
        }
        else {
            const mainCategory = getMainCategoryBySubCategoryId(categoryId)

            if (mainCategory) {
                if (activeMainCategory !== mainCategory.id) {
                    onMainCategoryClick(mainCategory.id)

                    if(!expandedCategories.includes(mainCategory.id)) {
                        setExpandedCategories((prev) => [...prev, mainCategory.id])
                    }
                }
            }

            onSubCategoryClick(categoryId)
        }
    }

    const handleAllClick = () => {
        onMainCategoryClick(null)
        onSubCategoryClick(null)
        setExpandedCategories([])
    }

    const toggleMobildSidebar = () => {
        setIsMobileOpen(!isMobileOpen)
    }

    const sortedCategories = useMemo(() => {
        return categories.map((category) => {
            if (!category.children || category.children.length === 0) {
                return category
            }

            const sortedChildren = [...category.children].sort((a, b) => a.name.localeCompare(b.name, "ja"))

            return {
                ...category,
                children: sortedChildren,
            }
        })
    }, [categories])

    const SidebarContent = () => (
        <div className={`h-full flex flex-col ${japaneseFont.className}`}>
            <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleMobildSidebar}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="
                flex-1
                overflow-scroll [&::-webkit-scrollbar]:hidden
                p-4 space-y-2
                "
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
               >
                <button
                    onClick={handleAllClick}
                    className={cn(
                        "w-full text-left px-3 py-2 rounded-md transition-colors",
                        !activeMainCategory ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                >
                    全カテゴリー
                </button>

                {sortedCategories.map((category) => (
                    <div key={category.id} className="space-y-1">
                        <div className = "flex items-center">
                            <button
                                onClick={() => handleMainCategoryClick(category.id)}
                                className={cn(
                                    "flex-1 text-left px-3 py-2 rounded-md transition-colors",
                                    activeMainCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                                )}
                            >
                                {category.name}
                            </button>

                            {category.children && category.children.length > 0 && (
                                <button onClick={() => toggleCategory(category.id)} className="p-1 hover:bg-muted rounded">
                                    {expandedCategories.includes(category.id) ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>      
                            )}
                        </div>
                        
                        <AnimatePresence>
                            {expandedCategories.includes(category.id) && category.children && (
                                <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 space-y-1 overflow-hidden"
                                >
                                {category.children.map((subCategory) => (
                                    <button
                                    key={subCategory.id}
                                    onClick={() => handleSubCategoryClick(subCategory.id)}
                                    className={cn(
                                        "w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors",
                                        activeSubCategory === subCategory.id
                                        ? "bg-primary/80 text-primary-foreground"
                                        : "hover:bg-muted/50",
                                    )}
                                    >
                                    {subCategory.name}
                                    </button>
                                ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <>
            <Button variant="outline" size="sm" className="md:hidden fixed top-20 left-4 z-40" onClick=
            {toggleMobildSidebar}>
                <Menu className="h-4 w-4" />
                <span className="ml-2">カテゴリー</span>
            </Button>
  
            <div className="hidden md:block bg-white/50 w-64 border-r h-full">
                <SidebarContent />
            </div>         

            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial = {{ opacity: 0 }}
                            animate = {{ opacity: 1 }}
                            exit = {{ opacity: 0 }}
                            className="md:hidden fixed inset-0 bg-black/50 z-40"
                            onClick={toggleMobildSidebar}
                        />

                        <motion.div
                            initial = {{ x: "-100%" }}
                            animate = {{ x: 0 }}
                            exit = {{ x: "-100%"}}
                            transition = {{ type: "spring", damping: 25, stiffness: 200 }}
                            className="md:hidden fixed left-0 top-0 bottom-0 w-80 bg-card border-r z-50"
                        >
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}