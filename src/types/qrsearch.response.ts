export interface QrSearchResponse {
  status: number
  message: string
  body: Body
  success: boolean
}

export interface Body {
  client: Client
  event: Event
}

export interface Client {
  id: number
  name: string
  numberDocument: string
  qrEncrypted: string
  status: number
  eventId: number
  confirmAssistance: number
}

export interface Event {
  id: number
  name: string
  dateEvent: Date
  status: number
}
