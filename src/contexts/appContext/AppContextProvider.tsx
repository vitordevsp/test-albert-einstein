import { useEffect, useState } from 'react'
import { AppContext, ChatbotHistoryProps } from './AppContext'
import { questionsService } from '../../services/QuestionsService'
import { Question } from '../../services/QuestionsService/types'

interface AppContextProviderProps {
  children: React.ReactNode
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  // @TODO: Salvar e buscar do localStorage
  const [userName, setUserName] = useState('')

  const [isActiveChatbotModal, setIsActiveChatbotModal] = useState(false)
  const toggleIsActiveChatbotModal = () => setIsActiveChatbotModal(currentValue => !currentValue)

  const [chatbotInput, setChatbotInput] = useState('')

  const [chatbotHistory, setChatbotHistory] = useState<ChatbotHistoryProps[]>([
    {
      name: 'chatbot',
      text: 'Olá, fique a vontade para me fazer uma pergunta. Abaixo eu deixei algumas sugestões de dúvidas comuns.',
      type: 'chatbot',
    },
    {
      name: 'Vitor',
      text: 'Salve salve ',
      type: 'user',
    },
  ])

  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await questionsService.list()
      setQuestions(data)
    }
    fetchData()
  }, [])

  return (
    <AppContext.Provider value={{
      userName,
      setUserName,

      questions,

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
