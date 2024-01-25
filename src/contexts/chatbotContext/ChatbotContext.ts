import { Dispatch, SetStateAction, createContext } from 'react'
import { IChatbotHistory, IQuestionOption } from '../../interfaces/chatBot'

export interface ChatbotContextProps {
  isActiveChatbotModal: boolean
  toggleIsActiveChatbotModal: () => void

  chatbotInput: string
  setChatbotInput: Dispatch<SetStateAction<string>>

  enableBotVoice: boolean
  toggleEnableBotVoice: () => void

  chatbotHistory: IChatbotHistory[]
  chatbotHistoryLoading: boolean
  setChatbotHistory: Dispatch<SetStateAction<IChatbotHistory[]>>

  registerQuestionAndAnswerChatbot: (text: string) => Promise<void>
  evaluateResponseMessage: (like: 'true' | 'false', history: IChatbotHistory) => Promise<void>
  generateQuestionFromAnswer: (history: IChatbotHistory) => Promise<void>
  saveGeneratedQuestionAnswer: (dialogueId: string, option: IQuestionOption) => Promise<void>
}

export const ChatbotContext = createContext({} as ChatbotContextProps)
