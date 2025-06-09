import type { Category } from "@/types/gallery"

export const mainCategories: Category[] =[
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
        {id: "shake", name: "しゃけ", color: "", logoUrl: ""}, 
        {id: "hiyokopiyopiyo", name: "ひよこぴよぴよ", color: "", logoUrl: ""}, 
        {id: "purimo", name: "ぷりも", color: "", logoUrl: ""},
        {id: "amepan", name: "あめぱん", color: "", logoUrl: ""},
        {id: "amahatu", name: "あまはつ", color: "", logoUrl: ""},
        {id: "fam", name: "ファム", color: "", logoUrl: ""},
        {id: "menoa", name: "メノア", color: "", logoUrl: ""},
        {id: "tabane", name: "たばね", color: "", logoUrl: ""},
        {id: "melonlemon", name: "めろんれもん", color: "", logoUrl: ""},
        {id: "machin", name: "まっちん", color: "", logoUrl: ""},
        {id: "rako", name: "ラコシンジゲート", color: "", logoUrl: ""},
        {id: "yuyuchi", name: "ゆゆち", color: "", logoUrl: ""},
    ]
    }
]

export const getCategoryById = (categoryId: string): Category | undefined => {
    return mainCategories.find((category) => category.id === categoryId)
}
  
export const getSubCategoryById = (mainCategoryId: string, subCategoryId: string): Category | undefined => {
    const mainCategory = getCategoryById(mainCategoryId)
    return mainCategory?.children?.find((subCategory) => subCategory.id === subCategoryId)
}

export const getMainCategoryBySubCategoryId = (subCategoryId: string): Category | undefined => {
    for (const mainCategory of mainCategories) {
    if (mainCategory.children?.some((subCategory) => subCategory.id === subCategoryId)) {
        return mainCategory
    }
    }
    return undefined
}
  
  
export const getSubCategoryNames = (mainCategoryId: string, subCategoryIds: string[]): string[] => {
    const mainCategory = getCategoryById(mainCategoryId)
    if (!mainCategory?.children) return []

    return subCategoryIds
    .map((subCatId) => {
        const subCat = mainCategory.children?.find((sub) => sub.id === subCatId)
        return subCat ? subCat.name : null
    })
    .filter(Boolean) as string[]
}