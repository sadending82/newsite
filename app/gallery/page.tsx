import Gallery from "@/components/gallery"

export default function GalleryPage() {
  return (
    <main className="container mx-auto px-4 py-20">
      <div className="text-center py-2 mb-12">
        <h1 className="text-center text-5xl font-bold tracking-tight mb-4">Photo Gallery</h1>
      </div>
      <Gallery />
    </main>
  )
}

