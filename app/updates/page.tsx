"use client"

import { useState } from "react"
import { getUpdatesByType, getUpdateStats } from "@/data/updates"
import UpdateFilter from "@/components/updateFilter"
import UpdateItemComponent from "@/components/updateItem"
import UpdateStats from "@/components/updateStats"
import type { UpdateType } from "@/types/updates"
import { Card } from "@/components/ui/card"
import { japaneseFont } from "@/components/fonts"

export default function UpdatesPage() {
  const [selectedType, setSelectedType] = useState<UpdateType | "all">("all")

  const filteredUpdates = getUpdatesByType(selectedType)
  const stats = getUpdateStats()

  // 필터 버튼에 표시할 카운트 정보
  const updateCounts = {
    all: stats.total,
    new: stats.feature,
    improvement: stats.improvement,
    bugfix: stats.bugfix,
    design: stats.design,
    performance: stats.performance,
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Update Log</h1>
        </div>
        
        <Card>
          <div className="text-center">  
            <div className="mt-4 text-sm text-gray-500">
              今まで <span className="font-semibold text-gray-700">{stats.total}</span>回のアップデートがありました。
            </div>
          </div>

          {/* 필터 */}
          <UpdateFilter selectedType={selectedType} onTypeChange={setSelectedType} updateCounts={updateCounts} />

          {/* 업데이트 목록 */}
          <div className="space-y-6">
            {filteredUpdates.map((update) => (
              <UpdateItemComponent key={update.id} update={update} />
            ))}
          </div>

          {/* 결과가 없을 때 */}
          {filteredUpdates.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-gray-500 text-lg ${japaneseFont.className}`}>そのタイプのアップデートが存在しません。</p>
            </div>
          )}

          <div className="px-5">
          {/* 통계 */}
          <UpdateStats stats={stats} />
          </div>
        </Card>
      </div>
    </div>
  )
}