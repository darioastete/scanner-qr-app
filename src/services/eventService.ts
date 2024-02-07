import axios, { AxiosResponse } from "axios"
import { EventRequest } from "../types/event.request"
import { EventResponse } from "../types/event.response"

export const CounterRequestApi = axios.create({
  baseURL: "https://door-eta.vercel.app",
})

export const createEvent = (data: EventRequest): Promise<EventRequest> => {
  return CounterRequestApi.post<EventRequest>("/events", data).then(
    (response: AxiosResponse<EventRequest>) => response.data
  )
}

export const getAll = (): Promise<EventResponse[] | []> => {
  return CounterRequestApi.get("/events").then(
    (response: AxiosResponse<EventResponse[]>) => response.data
  )
}
