import axios, { AxiosResponse } from "axios"
import { ClientResponse } from "../types/client.response"
import { QrSearchResponse } from "../types/qrsearch.response"

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
  console.log("service", qrEncrypted)
  return CounterRequestApi.post(`/clients/validateqr`, {
    qrEncrypted,
    eventId,
  }).then((response: AxiosResponse<QrSearchResponse>) => response.data)
}
