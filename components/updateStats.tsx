import { Card } from "@/components/ui/card"
import { updateTypeConfig } from "@/lib/updateConfig"

type UpdateStatsProps = {
  stats: Record<string, number>
}

export default function UpdateStats({ stats }: UpdateStatsProps) {
  const displayTypes = Object.keys(updateTypeConfig).filter((type) => type !== "all")

  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
      {displayTypes.map((type) => {
        const config = updateTypeConfig[type]
        const count = stats[type] || 0
        const Icon = config.icon

        return (
          <Card key={type} className="text-center p-4">
            <div className={`${config.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <Icon className={`h-6 w-6 ${config.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{count}</div>
            <div className="text-sm text-gray-500">{config.label}</div>
          </Card>
        )
      })}
    </div>
  )
}