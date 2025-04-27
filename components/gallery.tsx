"use client"

import { useEffect, useState} from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useBackground } from "./BackgroundContext"
import Lightbox from "@/components/lightbox"
import {ChevronLeft, ChevronRight} from "lucide-react"
import { japaneseFont } from "@/components/fonts"

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
  subCategories: string[]
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
      {id: "hime", name: "ひめ", color: "", logoUrl: ""}, 
      {id: "sarena", name: "天河サレナ", color: "", logoUrl: ""}, 
      {id: "meimeime", name: "めいめいはせっと", color: "", logoUrl: ""}, 
      {id: "yusurin", name: "ゆすりん", color: "", logoUrl: ""}, 
      {id: "nagi", name: "薙。", color: "", logoUrl: ""}, 
      {id: "firanty", name: "Firanty", color: "", logoUrl: ""}, 
      {id: "wagiri", name: "わぎり", color: "", logoUrl: ""}, 
      {id: "rurio", name: "るりお君", color: "", logoUrl: ""}, 
      {id: "muu", name: "むぅ", color: "", logoUrl: ""}, 
      {id: "yayo", name: "やよちゃん", color: "", logoUrl: ""},
      {id: "tococo", name: "とここ", color: "", logoUrl: ""},
      {id: "kiruto", name: "キルト", color: "", logoUrl: ""},
      {id: "ganmon", name: "がんもん", color: "", logoUrl: ""},
      {id: "sutoai", name: "すとあい", color: "", logoUrl: ""},
      {id: "jyonko", name: "あまちじょんこ", color: "", logoUrl: ""},
      {id: "miyasaka", name: "宮坂稲荷", color:"", logoUrl: ""},
      {id: "mamuru", name: "まむる", color:"", logoUrl: ""},
      {id: "celestia", name: "Celestia", color: "", logoUrl: ""},
      {id: "firi", name: "ふぃり", color: "", logoUrl: ""},
      {id: "eucliwood", name: "ユークリウッド", color: "", logoUrl: ""},
      {id: "clow", name: "clow_", color: "", logoUrl: ""},
      {id: "pomeran", name: "ぽめらん", color: "", logoUrl: ""},
      {id: "ragita", name: "らぎ太", color: "", logoUrl: ""},
      {id: "nanoha", name: "なのは", color: "", logoUrl: ""},
      {id: "mekanyanko", name: "めかにゃんこ", color: "", logoUrl: ""},
      {id: "shiduku", name: "しづく", color: "", logoUrl: ""},
      {id: "matumotorina", name: "松本莉奈", color: "", logoUrl: ""},
      {id: "cocoa", name: "ここあ", color: "", logoUrl: ""},
      {id: "totoro", name: "華杜トトロ", color: "", logoUrl: ""},  
      {id: "shakenokiwami", name: "shake_no_kiwami", color: "", logoUrl: ""}, 
      {id: "hiyokopiyopiyo", name: "ひよこぴよぴよ", color: "", logoUrl: ""}, 
      {id: "purimo", name: "ぷりも", color: "", logoUrl: ""},
      {id: "amepan", name: "あめぱん", color: "", logoUrl: ""},
    ]
  }
]

// gallery data
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID1.png",
    date: "2025-02-19",
  },
  {
    id: 2,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID2.png",
    date: "2025-02-19",
  },
  {
    id: 3,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID3.png",
    date: "2025-02-19",
  },
  {
    id: 4,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategories: ["sarena",],
    imageUrl: "/Images/ID4.png",
    date: "2025-03-05",
  },
  {
    id: 5,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategories: ["sarena",],
    imageUrl: "/Images/ID5.png",
    date: "2025-03-05",
  },
  {
    id: 6,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategories: ["sarena",],
    imageUrl: "/Images/ID6.png",
    date: "2024-12-04",
  },
  {
    id: 7,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID7.png",
    date: "2024-12-04",
  },
  {
    id: 8,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID8.png",
    date: "2024-07-10",
  },
  {
    id: 9,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategories: ["sarena",],
    imageUrl: "/Images/ID9.png",
    date: "2024-10-30",
  },
  {
    id: 10,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategories: ["sarena",],
    imageUrl: "/Images/ID10.png",
    date: "2024-11-13",
  },
  {
    id: 11,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategories: ["sarena",],
    imageUrl: "/Images/ID11.png",
    date: "2024-11-13",
  },
  {
    id: 12,
    title: "めいめいはせっと",
    mainCategory: "mesugakissa",
    subCategories: ["meimeime",],
    imageUrl: "/Images/ID12.png",
    date: "2025-03-05",
  },
  {
    id: 13,
    title: "ゆすりん",
    mainCategory: "mesugakissa",
    subCategories: ["yusurin",],
    imageUrl: "/Images/ID13.png",
    date: "2025-03-05",
  },
  {
    id: 14,
    title: "ゆすりん",
    mainCategory: "mesugakissa",
    subCategories: ["yusurin",],
    imageUrl: "/Images/ID14.png",
    date: "2025-03-05",
  },
  {
    id: 15,
    title: "薙。",
    mainCategory: "mesugakissa",
    subCategories: ["nagi",],
    imageUrl: "/Images/ID15.png",
    date: "2025-03-05",
  },
  {
    id: 16,
    title: "Firanty",
    mainCategory: "mesugakissa",
    subCategories: ["firanty",],
    imageUrl: "/Images/ID16.png",
    date: "2025-03-05",
  },
  {
    id: 17,
    title: "Firanty",
    mainCategory: "mesugakissa",
    subCategories: ["firanty",],
    imageUrl: "/Images/ID17.png",
    date: "2025-03-05",
  },
  {
    id: 18,
    title: "わぎり",
    mainCategory: "mesugakissa",
    subCategories: ["wagiri",],
    imageUrl: "/Images/ID18.png",
    date: "2025-03-05",
  },
  {
    id: 19,
    title: "わぎり",
    mainCategory: "mesugakissa",
    subCategories: ["wagiri",],
    imageUrl: "/Images/ID19.png",
    date: "2025-03-05",
  },
  {
    id: 20,
    title: "むぅ",
    mainCategory: "mesugakissa",
    subCategories: ["muu",],
    imageUrl: "/Images/ID20.png",
    date: "2025-03-05",
  },
  {
    id: 21,
    title: "宮坂稲荷",
    mainCategory: "mesugakissa",
    subCategories: ["miyasaka",],
    imageUrl: "/Images/ID21.png",
    date: "2025-03-05",
  },
  {
    id: 22,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategories: ["sarena",],
    imageUrl: "/Images/ID22.png",
    date: "2025-03-12",
  },
  {
    id: 23,
    title: "やよちゃん",
    mainCategory: "mesugakissa",
    subCategories: ["yayo",],
    imageUrl: "/Images/ID23.png",
    date: "2025-03-12",
  },
  {
    id: 24,
    title: "るりお君",
    mainCategory: "mesugakissa",
    subCategories: ["rurio",],
    imageUrl: "/Images/ID24.png",
    date: "2025-03-12",
  },
  {
    id: 25,
    title: "るりお君",
    mainCategory: "mesugakissa",
    subCategories: ["rurio",],
    imageUrl: "/Images/ID25.png",
    date: "2025-03-12",
  },
  {
    id: 26,
    title: "とここ",
    mainCategory: "mesugakissa",
    subCategories: ["tococo",],
    imageUrl: "/Images/ID26.png",
    date: "2025-03-12",
  },
  {
    id: 27,
    title: "むぅ",
    mainCategory: "mesugakissa",
    subCategories: ["muu",],
    imageUrl: "/Images/ID27.png",
    date: "2025-03-12",
  },
  {
    id: 28,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategories: ["sarena",],
    imageUrl: "/Images/ID28.png",
    date: "2025-03-12",
  },
  {
    id: 29,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID29.png",
    date: "2025-03-12",
  },
  {
    id: 30,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID30.png",
    date: "2025-03-12",
  },
  {
    id: 31,
    title: "キルト",
    mainCategory: "mesugakissa",
    subCategories: ["kiruto",],
    imageUrl: "/Images/ID31.png",
    date: "2025-02-12",
  },
  {
    id: 32,
    title: "あまちじょんこ",
    mainCategory: "mesugakissa",
    subCategories: ["jyonko",],
    imageUrl: "/Images/ID32.png",
    date: "2025-02-12",
  },
  {
    id: 33,
    title: "がんもん",
    mainCategory: "mesugakissa",
    subCategories: ["ganmon",],
    imageUrl: "/Images/ID33.png",
    date: "2025-02-12",
  },
  {
    id: 34,
    title: "すとあい",
    mainCategory: "mesugakissa",
    subCategories: ["sutoai",],
    imageUrl: "/Images/ID34.png",
    date: "2025-02-19",
  },
  {
    id: 35,
    title: "薙。",
    mainCategory: "mesugakissa",
    subCategories: ["nagi",],
    imageUrl: "/Images/ID35.png",
    date: "2025-03-19",
  },
  {
    id: 36,
    title: "薙。",
    mainCategory: "mesugakissa",
    subCategories: ["nagi",],
    imageUrl: "/Images/ID36.png",
    date: "2025-03-19",
  },
  {
    id: 37,
    title: "まむる",
    mainCategory: "mesugakissa",
    subCategories: ["mamuru",],
    imageUrl: "/Images/ID37.png",
    date: "2025-03-19",
  },
  {
    id: 38,
    title: "まむる",
    mainCategory: "mesugakissa",
    subCategories: ["mamuru",],
    imageUrl: "/Images/ID38.png",
    date: "2025-03-19",
  },
  {
    id: 39,
    title: "とここ",
    mainCategory: "mesugakissa",
    subCategories: ["tococo",],
    imageUrl: "/Images/ID39.png",
    date: "2025-03-19",
  },
  {
    id: 40,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID40.png",
    date: "2025-03-19",
  },
  {
    id: 41,
    title: "Celestia、Firanty",
    mainCategory: "mesugakissa",
    subCategories: ["celestia", "firanty",],
    imageUrl: "/Images/ID41.png",
    date: "2025-03-19",
  },
  {
    id: 42,
    title: "とここ",
    mainCategory: "mesugakissa",
    subCategories: ["tococo",],
    imageUrl: "/Images/ID42.png",
    date: "2025-03-19",
  },
  {
    id: 43,
    title: "とここ",
    mainCategory: "mesugakissa",
    subCategories: ["tococo",],
    imageUrl: "/Images/ID43.png",
    date: "2025-03-19",
  },
  {
    id: 44,
    title: "ふぃり",
    mainCategory: "mesugakissa",
    subCategories: ["firi",],
    imageUrl: "/Images/ID44.png",
    date: "2025-03-19",
  },
  {
    id: 45,
    title: "ひめ、薙。",
    mainCategory: "mesugakissa",
    subCategories: ["hime","nagi",],
    imageUrl: "/Images/ID45.png",
    date: "2025-03-19",
  },
  {
    id: 46,
    title: "ひめ、薙。",
    mainCategory: "mesugakissa",
    subCategories: ["hime","nagi",],
    imageUrl: "/Images/ID46.png",
    date: "2025-03-19",
  },
  {
    id: 47,
    title: "Firanty",
    mainCategory: "mesugakissa",
    subCategories: ["firanty",],
    imageUrl: "/Images/ID47.png",
    date: "2025-03-19",
  },
  {
    id: 48,
    title: "ふぃり",
    mainCategory: "mesugakissa",
    subCategories: ["firi",],
    imageUrl: "/Images/ID48.png",
    date: "2025-03-19",
  },
  {
    id: 49,
    title: "ひめ、薙。",
    mainCategory: "mesugakissa",
    subCategories: ["hime","nagi",],
    imageUrl: "/Images/ID49.png",
    date: "2025-03-19",
  },
  {
    id: 50,
    title: "薙。",
    mainCategory: "mesugakissa",
    subCategories: ["nagi",],
    imageUrl: "/Images/ID50.png",
    date: "2025-03-19",
  },
  {
    id: 51,
    title: "とここ",
    mainCategory: "mesugakissa",
    subCategories: ["tococo",],
    imageUrl: "/Images/ID51.png",
    date: "2025-03-19",
  },
  {
    id: 52,
    title: "とここ",
    mainCategory: "mesugakissa",
    subCategories: ["tococo",],
    imageUrl: "/Images/ID52.png",
    date: "2025-03-19",
  },
  {
    id: 53,
    title: "ふぃり",
    mainCategory: "mesugakissa",
    subCategories: ["firi",],
    imageUrl: "/Images/ID53.png",
    date: "2025-03-19",
  },
  {
    id: 54,
    title: "薙。",
    mainCategory: "mesugakissa",
    subCategories: ["nagi",],
    imageUrl: "/Images/ID54.png",
    date: "2025-03-19",
  },
  {
    id: 55,
    title: "わぎり",
    mainCategory: "mesugakissa",
    subCategories: ["wagiri",],
    imageUrl: "/Images/ID55.png",
    date: "2025-03-19",
  },
  {
    id: 56,
    title: "わぎり",
    mainCategory: "mesugakissa",
    subCategories: ["wagiri",],
    imageUrl: "/Images/ID56.png",
    date: "2025-03-19",
  },
  {
    id: 57,
    title: "わぎり",
    mainCategory: "mesugakissa",
    subCategories: ["wagiri",],
    imageUrl: "/Images/ID57.png",
    date: "2025-03-19",
  },
  {
    id: 58,
    title: "薙。",
    mainCategory: "mesugakissa",
    subCategories: ["nagi",],
    imageUrl: "/Images/ID58.png",
    date: "2025-03-19",
  },
  {
    id: 59,
    title: "Celestia",
    mainCategory: "mesugakissa",
    subCategories: ["celestia",],
    imageUrl: "/Images/ID59.png",
    date: "2025-03-19",
  },
  {
    id: 60,
    title: "めかにゃんこ",
    mainCategory: "mesugakissa",
    subCategories: ["mekanyanko",],
    imageUrl: "/Images/ID60.png",
    date: "2025-03-19",
  },
  {
    id: 61,
    title: "めかにゃんこ",
    mainCategory: "mesugakissa",
    subCategories: ["mekanyanko",],
    imageUrl: "/Images/ID61.png",
    date: "2025-03-19",
  },
  {
    id: 62,
    title: "ユークリウッド",
    mainCategory: "mesugakissa",
    subCategories: ["eucliwood",],
    imageUrl: "/Images/ID62.png",
    date: "2025-03-19",
  },
  {
    id: 63,
    title: "るりお君",
    mainCategory: "mesugakissa",
    subCategories: ["rurio",],
    imageUrl: "/Images/ID63.png",
    date: "2025-02-19",
  },
  {
    id: 64,
    title: "るりお君",
    mainCategory: "mesugakissa",
    subCategories: ["rurio",],
    imageUrl: "/Images/ID64.png",
    date: "2025-02-19",
  },
  {
    id: 65,
    title: "るりお君",
    mainCategory: "mesugakissa",
    subCategories: ["rurio",],
    imageUrl: "/Images/ID65.png",
    date: "2025-02-19",
  },
  {
    id: 66,
    title: "clow_",
    mainCategory: "mesugakissa",
    subCategories: ["clow",],
    imageUrl: "/Images/ID66.png",
    date: "2025-01-08",
  },
  {
    id: 67,
    title: "ぽめらん",
    mainCategory: "mesugakissa",
    subCategories: ["pomeran",],
    imageUrl: "/Images/ID67.png",
    date: "2025-01-08",
  },
  {
    id: 68,
    title: "がんもん",
    mainCategory: "mesugakissa",
    subCategories: ["ganmon",],
    imageUrl: "/Images/ID68.png",
    date: "2025-01-08",
  },
  {
    id: 69,
    title: "がんもん",
    mainCategory: "mesugakissa",
    subCategories: ["ganmon",],
    imageUrl: "/Images/ID69.png",
    date: "2025-01-08",
  },
  {
    id: 70,
    title: "ユークリウッド",
    mainCategory: "mesugakissa",
    subCategories: ["eucliwood",],
    imageUrl: "/Images/ID70.png",
    date: "2025-01-08",
  },
  {
    id: 71,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID71.png",
    date: "2025-01-15",
  },
  {
    id: 72,
    title: "キルト",
    mainCategory: "mesugakissa",
    subCategories: ["kiruto",],
    imageUrl: "/Images/ID72.png",
    date: "2025-01-15",
  },
  {
    id: 73,
    title: "まむる",
    mainCategory: "mesugakissa",
    subCategories: ["mamuru",],
    imageUrl: "/Images/ID73.png",
    date: "2025-01-15",
  },
  {
    id: 74,
    title: "らぎ太",
    mainCategory: "mesugakissa",
    subCategories: ["ragita",],
    imageUrl: "/Images/ID74.png",
    date: "2025-01-15",
  },
  {
    id: 75,
    title: "なのは",
    mainCategory: "mesugakissa",
    subCategories: ["nanoha",],
    imageUrl: "/Images/ID75.png",
    date: "2025-01-15",
  },
  {
    id: 76,
    title: "ふぃり",
    mainCategory: "mesugakissa",
    subCategories: ["firi",],
    imageUrl: "/Images/ID76.png",
    date: "2025-01-15",
  },
  {
    id: 77,
    title: "ふぃり",
    mainCategory: "mesugakissa",
    subCategories: ["firi",],
    imageUrl: "/Images/ID77.png",
    date: "2025-01-15",
  },
  {
    id: 78,
    title: "clow_",
    mainCategory: "mesugakissa",
    subCategories: ["clow",],
    imageUrl: "/Images/ID78.png",
    date: "2025-01-22",
  },
  {
    id: 79,
    title: "Celestia",
    mainCategory: "mesugakissa",
    subCategories: ["celestia",],
    imageUrl: "/Images/ID79.png",
    date: "2025-01-22",
  },

  {
    id: 80,
    title: "あまちじょんこ",
    mainCategory: "mesugakissa",
    subCategories: ["jyonko",],
    imageUrl: "/Images/ID80.png",
    date: "2025-01-22",
  },

  {
    id: 81,
    title: "ふぃり",
    mainCategory: "mesugakissa",
    subCategories: ["firi",],
    imageUrl: "/Images/ID81.png",
    date: "2025-01-15",
  },

  {
    id: 82,
    title: "るりお君",
    mainCategory: "mesugakissa",
    subCategories: ["rurio",],
    imageUrl: "/Images/ID82.png",
    date: "2025-03-26",
  },

  {
    id: 83,
    title: "るりお君",
    mainCategory: "mesugakissa",
    subCategories: ["rurio",],
    imageUrl: "/Images/ID83.png",
    date: "2025-03-26",
  },

  {
    id: 84,
    title: "るりお君",
    mainCategory: "mesugakissa",
    subCategories: ["rurio",],
    imageUrl: "/Images/ID84.png",
    date: "2025-03-26",
  },

  {
    id: 85,
    title: "宮坂稲荷",
    mainCategory: "mesugakissa",
    subCategories: ["miyasaka",],
    imageUrl: "/Images/ID85.png",
    date: "2025-03-26",
  },

  {
    id: 86,
    title: "あまちじょんこ",
    mainCategory: "mesugakissa",
    subCategories: ["jyonko",],
    imageUrl: "/Images/ID86.png",
    date: "2025-03-26",
  },

  {
    id: 87,
    title: "Celestia",
    mainCategory: "mesugakissa",
    subCategories: ["celestia",],
    imageUrl: "/Images/ID87.png",
    date: "2025-03-26",
  },

  {
    id: 88,
    title: "るりお君",
    mainCategory: "mesugakissa",
    subCategories: ["rurio",],
    imageUrl: "/Images/ID88.png",
    date: "2025-03-26",
  },

  {
    id: 89,
    title: "めかにゃんこ",
    mainCategory: "mesugakissa",
    subCategories: ["mekanyanko",],
    imageUrl: "/Images/ID89.png",
    date: "2025-03-26",
  },

  {
    id: 90,
    title: "がんもん",
    mainCategory: "mesugakissa",
    subCategories: ["ganmon",],
    imageUrl: "/Images/ID90.png",
    date: "2025-03-26",
  },

  {
    id: 91,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID91.png",
    date: "2025-03-26",
  },

  {
    id: 92,
    title: "がんもん",
    mainCategory: "mesugakissa",
    subCategories: ["ganmon",],
    imageUrl: "/Images/ID92.png",
    date: "2025-03-26",
  },

  {
    id: 93,
    title: "Celestia",
    mainCategory: "mesugakissa",
    subCategories: ["celestia",],
    imageUrl: "/Images/ID93.png",
    date: "2025-03-26",
  },

  {
    id: 94,
    title: "ユークリウッド",
    mainCategory: "mesugakissa",
    subCategories: ["eucliwood",],
    imageUrl: "/Images/ID94.png",
    date: "2025-04-02",
  },

  {
    id: 95,
    title: "ユークリウッド",
    mainCategory: "mesugakissa",
    subCategories: ["eucliwood",],
    imageUrl: "/Images/ID95.png",
    date: "2025-04-02",
  },

  {
    id: 96,
    title: "しづく",
    mainCategory: "mesugakissa",
    subCategories: ["shiduku",],
    imageUrl: "/Images/ID96.png",
    date: "2025-04-02",
  },

  {
    id: 97,
    title: "天河サレナ",
    mainCategory: "mesugakissa",
    subCategories: ["sarena",],
    imageUrl: "/Images/ID97.png",
    date: "2025-04-02",
  },

  {
    id: 98,
    title: "ぽめらん",
    mainCategory: "mesugakissa",
    subCategories: ["pomeran",],
    imageUrl: "/Images/ID98.png",
    date: "2025-04-02",
  },

  {
    id: 99,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID99.png",
    date: "2025-04-02",
  },

  {
    id: 100,
    title: "宮坂稲荷",
    mainCategory: "mesugakissa",
    subCategories: ["miyasaka",],
    imageUrl: "/Images/ID100.png",
    date: "2025-04-02",
  },

  {
    id: 101,
    title: "ぽめらん",
    mainCategory: "mesugakissa",
    subCategories: ["pomeran",],
    imageUrl: "/Images/ID101.png",
    date: "2025-04-02",
  },

  {
    id: 102,
    title: "わぎり",
    mainCategory: "mesugakissa",
    subCategories: ["wagiri",],
    imageUrl: "/Images/ID102.png",
    date: "2025-04-02",
  },

  {
    id: 103,
    title: "ぽめらん",
    mainCategory: "mesugakissa",
    subCategories: ["pomeran",],
    imageUrl: "/Images/ID103.png",
    date: "2025-04-02",
  },

  {
    id: 104,
    title: "松本莉奈",
    mainCategory: "mesugakissa",
    subCategories: ["matumotorina",],
    imageUrl: "/Images/ID104.png",
    date: "2025-04-02",
  },

  {
    id: 105,
    title: "松本莉奈",
    mainCategory: "mesugakissa",
    subCategories: ["matumotorina",],
    imageUrl: "/Images/ID105.png",
    date: "2025-04-02",
  },

  {
    id: 106,
    title: "薙。",
    mainCategory: "mesugakissa",
    subCategories: ["nagi",],
    imageUrl: "/Images/ID106.png",
    date: "2025-04-09",
  },

  {
    id: 107,
    title: "clow_",
    mainCategory: "mesugakissa",
    subCategories: ["clow",],
    imageUrl: "/Images/ID107.png",
    date: "2025-04-09",
  },

  {
    id: 108,
    title: "がんもん",
    mainCategory: "mesugakissa",
    subCategories: ["ganmon",],
    imageUrl: "/Images/ID108.png",
    date: "2025-04-09",
  },

  {
    id: 109,
    title: "しづく",
    mainCategory: "mesugakissa",
    subCategories: ["shiduku",],
    imageUrl: "/Images/ID109.png",
    date: "2025-04-09",
  },

  {
    id: 110,
    title: "あまちじょんこ",
    mainCategory: "mesugakissa",
    subCategories: ["jyonko",],
    imageUrl: "/Images/ID110.png",
    date: "2025-04-09",
  },

  {
    id: 111,
    title: "ふぃり",
    mainCategory: "mesugakissa",
    subCategories: ["firi",],
    imageUrl: "/Images/ID111.png",
    date: "2025-04-09",
  },

  {
    id: 112,
    title: "薙。",
    mainCategory: "mesugakissa",
    subCategories: ["nagi",],
    imageUrl: "/Images/ID112.png",
    date: "2025-04-09",
  },

  {
    id: 113,
    title: "なのは",
    mainCategory: "mesugakissa",
    subCategories: ["nanoha",],
    imageUrl: "/Images/ID113.png",
    date: "2025-04-09",
  },

  {
    id: 114,
    title: "あまちじょんこ",
    mainCategory: "mesugakissa",
    subCategories: ["jyonko",],
    imageUrl: "/Images/ID114.png",
    date: "2025-04-09",
  },

  {
    id: 115,
    title: "あまちじょんこ",
    mainCategory: "mesugakissa",
    subCategories: ["jyonko",],
    imageUrl: "/Images/ID115.png",
    date: "2025-04-09",
  },

  {
    id: 116,
    title: "キルト",
    mainCategory: "mesugakissa",
    subCategories: ["kiruto",],
    imageUrl: "/Images/ID116.png",
    date: "2025-04-09",
  },

  {
    id: 117,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID117.png",
    date: "2025-04-09",
  },

  {
    id: 118,
    title: "ここあ",
    mainCategory: "mesugakissa",
    subCategories: ["cocoa",],
    imageUrl: "/Images/ID118.png",
    date: "2025-04-16",
  },

  {
    id: 119,
    title: "Celestia",
    mainCategory: "mesugakissa",
    subCategories: ["celestia",],
    imageUrl: "/Images/ID119.png",
    date: "2025-04-16",
  },

  {
    id: 120,
    title: "ここあ",
    mainCategory: "mesugakissa",
    subCategories: ["cocoa",],
    imageUrl: "/Images/ID120.png",
    date: "2025-04-16",
  },

  {
    id: 121,
    title: "がんもん",
    mainCategory: "mesugakissa",
    subCategories: ["ganmon",],
    imageUrl: "/Images/ID121.png",
    date: "2025-04-16",
  },

  {
    id: 122,
    title: "華杜トトロ",
    mainCategory: "mesugakissa",
    subCategories: ["totoro",],
    imageUrl: "/Images/ID122.png",
    date: "2025-04-16",
  },

  {
    id: 123,
    title: "ユークリウッド",
    mainCategory: "mesugakissa",
    subCategories: ["eucliwood",],
    imageUrl: "/Images/ID123.png",
    date: "2025-04-16",
  },

  {
    id: 124,
    title: "まむる",
    mainCategory: "mesugakissa",
    subCategories: ["mamuru",],
    imageUrl: "/Images/ID124.png",
    date: "2025-04-16",
  },

  {
    id: 125,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID125.png",
    date: "2025-04-16",
  },

  {
    id: 126,
    title: "ユークリウッド",
    mainCategory: "mesugakissa",
    subCategories: ["eucliwood",],
    imageUrl: "/Images/ID126.png",
    date: "2025-04-16",
  },

  {
    id: 127,
    title: "ひめ",
    mainCategory: "mesugakissa",
    subCategories: ["hime",],
    imageUrl: "/Images/ID127.png",
    date: "2025-04-23",
  },

  {
    id: 128,
    title: "ぽめらん",
    mainCategory: "mesugakissa",
    subCategories: ["pomeran",],
    imageUrl: "/Images/ID128.png",
    date: "2025-04-23",
  },

  {
    id: 129,
    title: "shake_no_kiwami",
    mainCategory: "mesugakissa",
    subCategories: ["shakenokiwami",],
    imageUrl: "/Images/ID129.png",
    date: "2025-04-23",
  },

  {
    id: 130,
    title: "むぅ",
    mainCategory: "mesugakissa",
    subCategories: ["muu",],
    imageUrl: "/Images/ID130.png",
    date: "2025-04-23",
  },

  {
    id: 131,
    title: "ひよこぴよぴよ",
    mainCategory: "mesugakissa",
    subCategories: ["hiyokopiyopiyo",],
    imageUrl: "/Images/ID131.png",
    date: "2025-04-23",
  },

  {
    id: 132,
    title: "ぷりも",
    mainCategory: "mesugakissa",
    subCategories: ["purimo",],
    imageUrl: "/Images/ID132.png",
    date: "2025-04-23",
  },

  {
    id: 133,
    title: "ぷりも",
    mainCategory: "mesugakissa",
    subCategories: ["purimo",],
    imageUrl: "/Images/ID133.png",
    date: "2025-04-23",
  },

  {
    id: 134,
    title: "むぅ",
    mainCategory: "mesugakissa",
    subCategories: ["muu",],
    imageUrl: "/Images/ID134.png",
    date: "2025-04-23",
  },

  {
    id: 135,
    title: "ぽめらん",
    mainCategory: "mesugakissa",
    subCategories: ["pomeran",],
    imageUrl: "/Images/ID135.png",
    date: "2025-04-23",
  },

  {
    id: 136,
    title: "shake_no_kiwami",
    mainCategory: "mesugakissa",
    subCategories: ["shakenokiwami",],
    imageUrl: "/Images/ID136.png",
    date: "2025-04-23",
  },

  {
    id: 137,
    title: "あめぱん",
    mainCategory: "mesugakissa",
    subCategories: ["amepan",],
    imageUrl: "/Images/ID137.png",
    date: "2025-04-23",
  },

  {
    id: 138,
    title: "めかにゃんこ",
    mainCategory: "mesugakissa",
    subCategories: ["mekanyanko",],
    imageUrl: "/Images/ID138.png",
    date: "2025-04-23",
  },

  {
    id: 139,
    title: "しづく",
    mainCategory: "mesugakissa",
    subCategories: ["shiduku",],
    imageUrl: "/Images/ID139.png",
    date: "2025-04-23",
  },

  {
    id: 140,
    title: "しづく",
    mainCategory: "mesugakissa",
    subCategories: ["shiduku",],
    imageUrl: "/Images/ID140.png",
    date: "2025-04-23",
  },

  {
    id: 141,
    title: "ひよこぴよぴよ",
    mainCategory: "mesugakissa",
    subCategories: ["hiyokopiyopiyo",],
    imageUrl: "/Images/ID141.png",
    date: "2025-04-23",
  },

  {
    id: 142,
    title: "がんもん",
    mainCategory: "mesugakissa",
    subCategories: ["ganmon",],
    imageUrl: "/Images/ID142.png",
    date: "2025-04-23",
  },

  {
    id: 143,
    title: "ぷりも",
    mainCategory: "mesugakissa",
    subCategories: ["purimo",],
    imageUrl: "/Images/ID143.png",
    date: "2025-04-23",
  },

]


export default function Gallery() {
  const [activeMainCategory, setActiveMainCategory] = useState<string | null>(null)
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null)
  //const [themeColor, setThemeColor] = useState("");
  const [lightboxOpen, SetLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const { setBackground } = useBackground();

  // Filter items based on selected category
  const filteredAndSortedItems = galleryItems.filter((item) => {
    if (!activeMainCategory) return true

    if (item.mainCategory !== activeMainCategory) return false

    if (!activeSubCategory) return true

    return item.subCategories.includes(activeSubCategory)
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

  const currentSubCategories = activeMainCategory
   ? mainCategories.find((cat) => cat.id === activeMainCategory)?.children || []
   : []

  const currentCategoryLogo = activeMainCategory
   ? mainCategories.find((cat) => cat.id ===activeMainCategory)?.logoUrl 
   : null

  return (
    <div className="space-y-8 transition=colors duration-300">
      {/* main category */}
      <div className={`flex flex-wrap gap-2 justify-center mb-4 ${japaneseFont.className}`}>
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
                      "px-3 py-1 text-sm", japaneseFont.className
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
    </div>
  )
}

