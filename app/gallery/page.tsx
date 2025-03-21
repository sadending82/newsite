import Gallery from "@/components/gallery"

export default function GalleryPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">ギャラリー</h1>
      </div>
      <Gallery />
    </main>
  )
}

