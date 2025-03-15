import Image from "next/image"
import { Mail, X} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <main>
      <section className="container mx-auto px-4 md:py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">連絡先</h1>
          <div className="container flex mx-auto items-center justify-center">
            <Image src="/Images/Profile.png?height=400&width=400" alt="profile" width={400} height={400} />
          </div>
          <p className="text-muted-foreground py-10 max-w-2xl mx-auto">
            用件がありましたら気楽に連絡してください！
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-2xl font-bold">情報</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">email</p>
                    <p className="text-muted-foreground">sadytrd8@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <X className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">X（旧ツイッター）</p>
                    <p className="text-muted-foreground">&#64;Sady_trd</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

