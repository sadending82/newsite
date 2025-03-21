"use client"

import Image from "next/image"
import { Mail, X} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <main>
      <section className="container mx-auto px-4 md:py-8">

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="space-y-6">

              <div className="text-center mb-12">
                <div className="container flex mx-auto items-center justify-center">
                  <Image src="/Images/Profile.png?height=200&width=200" alt="profile" width={200} height={200} />
                </div>
                <p className="my-10 max-w-2xl mx-auto">
                  用件がありましたら気楽に連絡してください！
                </p>
              </div>

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
                    <Button 
                      variant="outline"
                      className="text-muted-foreground"
                      onClick={() => {
                        window.open(
                          `https://x.com/Sady_trd`,
                        )
                      }}
                    >
                      &#64;Sady_trd
                    </Button>
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

