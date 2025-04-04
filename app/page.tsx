import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return ( 
    <main className="container mx-auto px-4 py-12 md:py-24">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Sady&apos;s Memory Box</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl py-5">
            サディーが訪ねたイベントでの写真を残すギャラリーです。
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
    </main>
  )
}

