import type { UpdateItem } from "@/types/updates"

// 업데이트 데이터
export const updates: UpdateItem[] = [
    {
        id: "2025-06-18.1",
        title: "写真アップロード",
        description: "5月28日分の写真をアップロード",
        type: "new",
        date: "2025-06-18",
        details: [
            "5月28日までの写真をアップロードしました。"
        ]
    },
    {
        id: "2025-06-09.2",
        title: "デザイン修正",
        description: "アップデートログページのデザイン修正",
        type: "design",
        date: "2025-06-09",
        details: [
            "アップデートログページのデザインをもうちょっとおしゃれな感じに修正しました。"
        ]
    },
    {
        id: "2025-06-09.1",
        title: "写真アップロード",
        description: "5月7日から5月21日分の写真をアップロード",
        type: "new",
        date: "2025-06-09",
        details: [
            "5月7日から5月21日までの写真をアップロードしました。"
        ]
    },
    {
        id: "2025-06-06.2",
        title: "FAQページ追加",
        description: "FAQページを追加",
        type: "new",
        date: "2025-06-06",
        details: [
            "サーバーが追加された事によって、最初のロードが長い場合があります。",
            "上の問題の対処を知らせるためにFAQページを追加しました。"
        ]
    },
    {
        id: "2025-06-06.1",
        title: "反応型UI修正",
        description: "小さい画面でのUI修正",
        type: "design",
        date: "2025-06-06",
        details: [
            "小型画面で見たとき、外見が可笑しくなっちゃう部分を修正しました。",
        ]
    },
    {
        id: "2025-06-04.1",
        title: "システム改善",
        description: "画像管理用のサーバーを追加",
        type: "improvement",
        date: "2025-06-04",
        details: [
            "画像の数が増えてきたので、ウェブサイト側で管理しきれない事を認知しました。",
            " 画像管理用のクラウドストレージを用意しました。",
            "クラウドストレージに接続するサーバーを用意しました。これからお金かかる...",
            "サーバーサイドが写真を管理するようになって、背景が変わらなくなりました...",
        ]
    },
    {
        id: "2025-06-03.1",
        title: "月別フィルタリングシステム追加",
        description: "月ごとに写真を分類する機能を追加",
        type: "new",
        date: "2025-06-03",
        details: [
            "画像の数が増えてきたので、月ごとに分類する機能を追加しました。"
        ]
    },
    {
        id: "2025-06-02.1",
        title: "デザイン修正",
        description: "フィルタリングシステム変更",
        type: "design",
        date: "2025-06-02",
        details: [
            "キャストの人数が増えて探しづらくなったフィルタリングシステムをサイドバー形式に変更しました。",
            "キャストのカテゴリーの表示を名前順に変えました。",
        ]
    },
    {
        id: "2025-05-07.1",
        title: "写真アップロード",
        description: "4月30日分の写真をアップロード",
        type: "new",
        date: "2025-05-07",
        details: [
            "4月30日分の写真をアップロードしました。",
        ]
    },
    {
        id: "2025-04-27.2",
        title: "写真アップロード",
        description: "4月16日、4月23日分の写真をアップロード",
        type: "new",
        date: "2025-04-27",
        details: [
            "4月16日、4月23日分の写真をアップロードしました。",
        ]
    },
    {
        id: "2025-04-27.1",
        title: "デザイン修正",
        description: "サイト全体のフォントやデザインを変更",
        type: "design",
        date: "2025-04-27",
        details: [
            "一部の日本語のフォントを変えてみました。（Rounded M+）",
            "Contactページを外見をほんのちょっとだけ修正しました。"
        ]
    },
    {
        id: "2025-04-26.1 ✨ アップデートログを追加しました。",
        title: "アップデートログ追加",
        description: "アップデートログを追加",
        type: "new",
        date: "2025-04-26",
        details: [
            "何が追加されたか分かりやすくするために、アップデートログを追加しました。"
        ]
    },
]

export const getUpdateById = (id: string): UpdateItem | undefined => {
  return updates.find((update) => update.id === id)
}

export const getUpdatesByType = (type: string): UpdateItem[] => {
  if (type === "all") return updates
  return updates.filter((update) => update.type === type)
}

export const getUpdatesByDateRange = (startDate: string, endDate: string): UpdateItem[] => {
  return updates.filter((update) => {
    const updateDate = new Date(update.date)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return updateDate >= start && updateDate <= end
  })
}

export const getLatestUpdates = (count: number): UpdateItem[] => {
  return updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count)
}

export const getUpdatesByVersion = (version: string): UpdateItem[] => {
  return updates.filter((update) => update.version === version)
}

export const getAvailableVersions = (): string[] => {
  const versions = updates.filter((update) => update.version).map((update) => update.version!)
  return [...new Set(versions)].sort((a, b) => b.localeCompare(a))
}

export const getUpdateStats = () => {
  const stats = {
    total: updates.length,
    new: updates.filter((u) => u.type === "new").length,
    improvement: updates.filter((u) => u.type === "improvement").length,
    bugfix: updates.filter((u) => u.type === "bugfix").length,
    design: updates.filter((u) => u.type === "design").length,
    performance: updates.filter((u) => u.type === "performance").length,
  }
  return stats
}