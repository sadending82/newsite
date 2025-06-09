"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { updateTypeConfig, formatDate } from "@/lib/updateConfig"
import type { UpdateItem } from "@/types/updates"
import { japaneseFont } from "@/components/fonts"

type UpdateItemProps = {
  update: UpdateItem
}

export default function UpdateItemComponent({ update }: UpdateItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const config = updateTypeConfig[update.type]
  const Icon = config.icon

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className="opacity-0 translate-y-4 animate-fadeIn px-4"
      style={{
        animation: "fadeIn 0.5s forwards",
      }}
    >
      <Card className={`${config.borderColor} border-l-4 hover:shadow-lg transition-shadow`}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className={`${config.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-5 w-5 ${config.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className={`text-xl ${japaneseFont.className}`}>{update.title}</CardTitle>
                  {update.version && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                      {update.version}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(update.date)}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${config.bgColor} ${config.color}`}>
                    {config.label}
                  </span>
                </div>
                <p className={`text-gray-700 leading-relaxed ${japaneseFont.className}`}>{update.description}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        {update.details && (
          <>
            <CardContent className="pt-0">
              <Button
                variant="ghost"
                onClick={toggleExpanded}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                />
                詳細
              </Button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <ul className="space-y-2">
                    {update.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
