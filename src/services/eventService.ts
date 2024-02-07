import axios, { AxiosResponse } from "axios"
import { EventRequest } from "../types/event.request"

export const CounterRequestApi = axios.create({
  baseURL: "https://door-eta.vercel.app",
})

export const createEvent = (data: EventRequest): Promise<EventRequest> => {
  return CounterRequestApi.post<EventRequest>("/events", data).then(
    (response: AxiosResponse<EventRequest>) => response.data
  )
}
