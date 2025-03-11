import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main>
      {/* 히어로 섹션 */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">サディーのギャラリー</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            サディーが適当に遊ぶために作ったWebページです。
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/gallery">
                ギャラリーに <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/contact">連絡先</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 두 개의 큰 이미지 섹션 */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="イメージ1"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h2 className="text-2xl font-bold">日常写真</h2>
            <p className="text-muted-foreground">
              VRCHATの日常での写真を集めてます。
            </p>
            <Button variant="link" asChild className="p-0">
              <Link href="/gallery">
                詳細 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="イメージ2"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h2 className="text-2xl font-bold">イベント写真</h2>
            <p className="text-muted-foreground">
              VRCHATで楽しんだイベントでの写真を集めてます。
            </p>
            <Button variant="link" asChild className="p-0">
              <Link href="/gallery">
                詳細 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

