"use client"

import Image from "next/image"
import toast from "react-hot-toast";
import { Mail, X} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { japaneseFont } from "@/components/fonts";

export default function ContactPage() {
  return (
    <main>
      <section className="container mx-auto px-4 md:py-8">

        <div className="text-center py-5 mb-4">
          <h1 className="text-center text-5xl font-bold tracking-tight mb-4">Contact</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="space-y-6">
              <div className="text-center bg-gray-100 rounded-md py-5">
                <div className="container flex mx-auto items-center justify-center py-4">
                  <Image src="/Images/Profile.png?height=200&width=200" alt="profile" width={200} height={200} />
                </div>
                <p className="font-bold max-w-2xl mx-auto text-2xl mb-5">
                  Sady_trd
                </p>
                <div className="bg-gray-200 rounded-md max-w-3xl mx-auto py-10">
                  <p className={`text-2xl ${japaneseFont.className}`}>
                    用件がありましたら、気楽にご連絡ください！
                  </p>
                </div>
              </div>

              <div className="space-y-4 bg-gray-100 rounded-md px-5 py-5">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">email</p>
                    <Button
                      variant="outline"
                      className="text-muted-foreground text-black"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText("sadytrd8@gmail.com");
                          toast.success("コピーしました。");
                        } catch {
                          toast.error(`コピーに失敗しました。`);
                        }
                      }}
                      >
                      sadytrd8@gmail.com
                      </Button>
                  </div>
                </div>

                <div className="flex items-start">
                  <X className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className={`font-medium`}>X（旧ツイッター）</p>
                    <Button 
                      variant="outline"
                      className="text-muted-foreground text-black"
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
      <div className="py-20"></div>
    </main>
  )
}

