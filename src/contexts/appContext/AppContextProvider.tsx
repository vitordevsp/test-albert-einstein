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

  const [chatbotHistory, setChatbotHistory] = useState<ChatbotHistoryProps[]>([])

  const registerQuestionAndAnswerChatbot = async (text: string) => {
    const historyQuestion: ChatbotHistoryProps = {
      name: userName || 'Usuário',
      text,
      type: 'user',
    }

    setChatbotHistory(currentValue => [...currentValue, historyQuestion])
    setChatbotInput('')

    const answerObj = await questionsService.get(text)

    if (answerObj) {
      const historyAnswer: ChatbotHistoryProps = {
        name: 'Chatbot Albertinho',
        text: answerObj.answer,
        type: 'chatbot',
      }

      setChatbotHistory(currentValue => [...currentValue, historyAnswer])
    }
    else {
      const historyAnswer: ChatbotHistoryProps = {
        name: 'Chatbot Albertinho',
        text: 'Infelizmente não estou preparado para responder essa pergunta.',
        type: 'chatbot',
      }

      setChatbotHistory(currentValue => [...currentValue, historyAnswer])
    }
  }

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
      registerQuestionAndAnswerChatbot,
    }}>
      {children}
    </AppContext.Provider>
  )
}
