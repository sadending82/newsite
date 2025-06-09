"use client"

import { Button } from "@/components/ui/button"
import { updateTypeConfig } from "@/lib/updateConfig"
import type { UpdateType } from "@/types/updates"
import { japaneseFont } from "@/components/fonts"

type UpdateFilterProps = {
  selectedType: UpdateType | "all"
  onTypeChange: (type: UpdateType | "all") => void
  updateCounts?: Record<string, number>
}

export default function UpdateFilter({ selectedType, onTypeChange, updateCounts }: UpdateFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {Object.entries(updateTypeConfig).map(([type, config]) => {
        const Icon = config.icon
        const count = updateCounts?.[type] || 0
        const showCount = type !== "all" && count > 0

        return (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            onClick={() => onTypeChange(type as UpdateType | "all")}
            className="flex items-center gap-2"
          >
            <Icon className={`h-4 w-4 ${japaneseFont.className}`}/>
            {config.label}
            {showCount && <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">{count}</span>}
          </Button>
        )
      })}
    </div>
  )
}