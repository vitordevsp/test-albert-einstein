import { Dispatch, SetStateAction, createContext } from 'react'

export interface ChatbotHistoryProps {
  name: string
  text: string
  type: 'user' | 'chatbot'
}

export interface AppContextProps {
  userName: string
  setUserName: Dispatch<SetStateAction<string>>

  isActiveChatbotModal: boolean
  toggleIsActiveChatbotModal: () => void

  chatbotInput: string
  setChatbotInput: Dispatch<SetStateAction<string>>

  chatbotHistory: ChatbotHistoryProps[]
  setChatbotHistory: Dispatch<SetStateAction<ChatbotHistoryProps[]>>
}

export const AppContext = createContext({} as AppContextProps)
