export type UpdateType = "new" | "improvement" | "bugfix" | "design" | "performance"

export type UpdateItem = {
  id: string
  title: string
  description: string
  type: UpdateType
  date: string
  version?: string
  details?: string[]
}

export type UpdateTypeConfig = {
  icon: any
  color: string
  bgColor: string
  borderColor: string
  label: string
}
