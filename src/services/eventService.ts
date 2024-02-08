import axios, { AxiosResponse } from "axios"
import { EventRequest } from "../types/event.request"
import { EventResponse } from "../types/event.response"

export const CounterRequestApi = axios.create({
  baseURL: "https://360-backend-psi.vercel.app",
})

export const createEvent = (data: EventRequest) => {
  return CounterRequestApi.post("/events", data).then(
    (response: AxiosResponse<EventResponse>) => response.data
  )
}

export const getAll = (): Promise<EventResponse[] | []> => {
  return CounterRequestApi.get("/events").then(
    (response: AxiosResponse<EventResponse[]>) => response.data
  )
}
