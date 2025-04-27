import UpdateLog from "@/components/updateLog";
import { Card, CardContent } from "@/components/ui/card";

export default function UpdatePage()
{
    return(
            <main className="container mx-auto px-4 py-20">
              <div className="text-center py-2 mb-12">
                <h3 className="text-center text-5xl font-bold tracking-tight mb-4">Update Log</h3>
              </div>
              <div className="text-center mb-12 grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                <Card>
                  <CardContent>
                    <UpdateLog/>
                  </CardContent>
                </Card>
              </div>
            </main>
    )
}