export interface AssistanceResponse {
  status: number
  message: string
  body?: Body
  success: boolean
}

export interface Body {
  generatedMaps: any[]
  raw: any[]
  affected: number
}
