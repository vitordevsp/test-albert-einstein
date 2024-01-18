import axios from 'axios'

export const chatBotAPI = axios.create({
  baseURL: 'http://localhost:8000',
})
