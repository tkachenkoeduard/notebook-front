import axios, {AxiosRequestConfig} from "axios"

const isServer = () => {
  return typeof window === "undefined";
}

let accessToken = ''
if (!isServer()) {
  accessToken = localStorage.getItem('accessToken') || ''
}

export const setAccessToken = (val: string) => {
  accessToken = val
  localStorage.setItem('accessToken', val)
}

export const resetAccessToken = () => {
  accessToken = ''
  localStorage.setItem('accessToken', '')
}

export const api = axios.create({
  baseURL: 'http://localhost:3333'
})

api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (accessToken && config?.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})