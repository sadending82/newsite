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
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">창의적인 포트폴리오</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            다양한 작품을 카테고리별로 살펴보세요. 저희의 갤러리에서 영감을 얻어가세요.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/gallery">
                갤러리 보기 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/contact">연락하기</Link>
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
                alt="포트폴리오 이미지 1"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h2 className="text-2xl font-bold">자연의 아름다움</h2>
            <p className="text-muted-foreground">
              자연의 경이로운 모습을 담은 작품들을 감상해보세요. 산, 바다, 숲 등 다양한 자연 풍경을 담았습니다.
            </p>
            <Button variant="link" asChild className="p-0">
              <Link href="/gallery">
                더 보기 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="포트폴리오 이미지 2"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h2 className="text-2xl font-bold">도시의 활력</h2>
            <p className="text-muted-foreground">
              현대 도시의 역동적인 모습을 담은 작품들입니다. 도시의 건축물과 거리, 사람들의 일상을 담았습니다.
            </p>
            <Button variant="link" asChild className="p-0">
              <Link href="/gallery">
                더 보기 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

