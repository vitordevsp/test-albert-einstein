import { Dispatch, SetStateAction, createContext } from 'react'
import { Question } from '../../services/QuestionsService/types'

export interface ChatbotHistoryProps {
  name: string
  text: string
  type: 'user' | 'chatbot'
}

export interface AppContextProps {
  userName: string
  setUserName: (name: string) => void

  questions: Question[]

  isActiveChatbotModal: boolean
  toggleIsActiveChatbotModal: () => void

  chatbotInput: string
  setChatbotInput: Dispatch<SetStateAction<string>>

  chatbotHistory: ChatbotHistoryProps[]
  setChatbotHistory: Dispatch<SetStateAction<ChatbotHistoryProps[]>>
  registerQuestionAndAnswerChatbot: (text: string) => Promise<void>
}

export const AppContext = createContext({} as AppContextProps)
