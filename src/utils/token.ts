import axios from "axios"

export function SaveToken(token: string) {
  localStorage.setItem("store_token", token)
}

export function GetToken() {
  return localStorage.getItem("store_token")
}

export function RemoveToken() {
  localStorage.removeItem("store_token")
}

export const AxiosRequest = axios.create({
  baseURL: import.meta.env.VITE_API,
})

AxiosRequest.interceptors.request.use(
  (config) => {
    const token = GetToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => Promise.reject(error)
)