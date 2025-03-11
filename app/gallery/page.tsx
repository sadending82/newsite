import Gallery from "@/components/gallery"

export default function GalleryPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">카테고리 갤러리</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          다양한 카테고리로 분류된 이미지 갤러리입니다. 원하는 카테고리를 선택하여 이미지를 필터링할 수 있습니다.
        </p>
      </div>
      <Gallery />
    </main>
  )
}

