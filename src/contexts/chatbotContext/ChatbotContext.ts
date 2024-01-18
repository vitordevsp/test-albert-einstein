import { Dispatch, SetStateAction, createContext } from 'react'
import { IChatbotHistory } from '../../interfaces/chatBot'

export interface ChatbotContextProps {
  isActiveChatbotModal: boolean
  toggleIsActiveChatbotModal: () => void

  chatbotInput: string
  setChatbotInput: Dispatch<SetStateAction<string>>

  chatbotHistory: IChatbotHistory[]
  setChatbotHistory: Dispatch<SetStateAction<IChatbotHistory[]>>

  registerQuestionAndAnswerChatbot: (text: string) => Promise<void>
  evaluateResponseMessage: (like: 'true' | 'false', history: IChatbotHistory) => Promise<void>
  generateQuestionFromAnswer: (history: IChatbotHistory) => Promise<void>
}

export const ChatbotContext = createContext({} as ChatbotContextProps)
