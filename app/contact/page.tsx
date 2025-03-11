import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">연락처</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          궁금한 점이 있으시면 언제든지 연락해 주세요. 빠른 시일 내에 답변 드리겠습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">연락처 정보</h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">이메일</p>
                  <p className="text-muted-foreground">contact@example.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">전화번호</p>
                  <p className="text-muted-foreground">02-123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">주소</p>
                  <p className="text-muted-foreground">서울특별시 강남구 테헤란로 123</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">운영시간</p>
                  <p className="text-muted-foreground">평일: 09:00 - 18:00</p>
                  <p className="text-muted-foreground">주말: 휴무</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">메시지 보내기</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  이름
                </label>
                <input id="name" type="text" className="w-full p-2 border rounded-md" placeholder="이름을 입력하세요" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="이메일을 입력하세요"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  메시지
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full p-2 border rounded-md"
                  placeholder="메시지를 입력하세요"
                />
              </div>

              <Button type="submit" className="w-full">
                보내기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

