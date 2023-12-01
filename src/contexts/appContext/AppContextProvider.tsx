import { useState } from 'react'
import { AppContext, ChatbotHistoryProps } from './AppContext'

interface AppContextProviderProps {
  children: React.ReactNode
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [userName, setUserName] = useState('')

  const [isActiveChatbotModal, setIsActiveChatbotModal] = useState(false)
  const toggleIsActiveChatbotModal = () => setIsActiveChatbotModal(currentValue => !currentValue)

  const [chatbotInput, setChatbotInput] = useState('')

  const [chatbotHistory, setChatbotHistory] = useState<ChatbotHistoryProps[]>([])

  return (
    <AppContext.Provider value={{
      userName,
      setUserName,

      isActiveChatbotModal,
      toggleIsActiveChatbotModal,

      chatbotInput,
      setChatbotInput,

      chatbotHistory,
      setChatbotHistory,
    }}>
      {children}
    </AppContext.Provider>
  )
}
