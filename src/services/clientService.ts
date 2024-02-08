import axios, { AxiosResponse } from "axios"
import { ClientResponse } from "../types/client.response"
import { QrSearchResponse } from "../types/qrsearch.response"
import { AssistanceResponse } from "../types/assistance.response"
import { ClientRequest } from "../types/client.request"
import { ClientDeleteResponse } from "../types/client.delete.response"

export const CounterRequestApi = axios.create({
  baseURL: "https://360-backend-psi.vercel.app",
})

export const createClient = (data: ClientRequest): Promise<ClientResponse> => {
  return CounterRequestApi.post("/clients", data).then(
    (response: AxiosResponse<ClientResponse>) => response.data
  )
}

export const deleteClient = (id: Number): Promise<ClientDeleteResponse> => {
  return CounterRequestApi.delete(`/clients/${id}`).then(
    (response: AxiosResponse<ClientDeleteResponse>) => response.data
  )
}

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
