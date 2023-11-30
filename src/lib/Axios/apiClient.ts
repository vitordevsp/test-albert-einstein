import axios from "axios"

export const apiClient = axios.create({
  baseURL: 'https://examples-edge-functions.vercel.app/api/',
})
