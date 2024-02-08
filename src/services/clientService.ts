import axios, { AxiosResponse } from "axios"
import { ClientResponse } from "../types/client.response"
import { QrSearchResponse } from "../types/qrsearch.response"
import { AssistanceResponse } from "../types/assistance.response"

export const CounterRequestApi = axios.create({
  baseURL: "https://360-backend-psi.vercel.app",
})

export const getClientsByEventIdService = (
  idEvent: Number
): Promise<ClientResponse[] | []> => {
  return CounterRequestApi.get(`/clients/getclientbyevent/${idEvent}`).then(
    (response: AxiosResponse<ClientResponse[]>) => response.data
  )
}

export const getClientByQRService = (
  qrEncrypted: String,
  eventId: Number
): Promise<QrSearchResponse> => {
  return CounterRequestApi.post(`/clients/validateqr`, {
    qrEncrypted,
    eventId,
  }).then((response: AxiosResponse<QrSearchResponse>) => response.data)
}

export const confirmAssistanceService = (
  qrEncrypted: String
): Promise<AssistanceResponse> => {
  return CounterRequestApi.post(`/clients/confirmassistance`, {
    qrEncrypted,
  }).then((response: AxiosResponse<AssistanceResponse>) => response.data)
}
