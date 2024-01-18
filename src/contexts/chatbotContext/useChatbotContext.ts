import { useContext } from 'react'
import { ChatbotContext } from './ChatbotContext'

export const useChatbotContext = () => {
  return useContext(ChatbotContext)
}
