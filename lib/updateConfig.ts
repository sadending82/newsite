import { Star, Zap, Bug, Plus, Settings, Palette } from "lucide-react"
import type { UpdateTypeConfig } from "@/types/updates"


export const updateTypeConfig: Record<string, UpdateTypeConfig> = {
  new: {
    icon: Plus,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    label: "新しい機能",
  },
  improvement: {
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    label: "改善",
  },
  bugfix: {
    icon: Bug,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    label: "バグ修正",
  },
  design: {
    icon: Palette,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    label: "デザイン変更",
  },
  performance: {
    icon: Settings,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    label: "最適化",
  },
  all: {
    icon: Star,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    label: "全体",
  },
}


export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}


export const getRelativeDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "昨日"
  if (diffDays <= 7) return `${diffDays}日前`
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)}週間前`
  if (diffDays <= 365) return `${Math.ceil(diffDays / 30)}ヶ月前`
  return `${Math.ceil(diffDays / 365)}年前`
}
