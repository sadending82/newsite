import { Mail, Phone} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">連絡先</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          連絡がほしいならこちらへー
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">X&#40;旧ツイッター&#41;</p>
                  <p className="text-muted-foreground">&#64;Sady_trd</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

