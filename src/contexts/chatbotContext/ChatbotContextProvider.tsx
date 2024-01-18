import { useEffect, useState } from 'react'
import { ChatbotContext } from './ChatbotContext'
import { chatbotService } from '../../services/ChatbotService'
import { IChatbotHistory } from '../../interfaces/chatBot'

interface ChatbotContextProviderProps {
  children: React.ReactNode
}

const userEmail = 'thiagoemsantos@gmail.com'

export function ChatbotContextProvider({ children }: ChatbotContextProviderProps) {
  const [isActiveChatbotModal, setIsActiveChatbotModal] = useState(false)
  const toggleIsActiveChatbotModal = () => setIsActiveChatbotModal(value => !value)

  const [chatbotInput, setChatbotInput] = useState('')

  // ----- History -----

  const [chatbotHistory, setChatbotHistory] = useState<IChatbotHistory[]>([])
  const addHistoryToChatbot = (history: IChatbotHistory) => {
    setChatbotHistory(currentValue => [...currentValue, history])

    setTimeout(() => {
      const mainTest = document.getElementById('chatbot-modal-main')
      if (!mainTest) return
      mainTest.scrollTop = mainTest.scrollHeight
    }, 200)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await chatbotService.historyList(userEmail)

      data.forEach(dialogue => {
        const {
          id: dialogue_id,
          email,
          creation_date,
          question,
          answer,
        } = dialogue

        const userHistory: IChatbotHistory = {
          dialogue_id,
          email,
          type: 'user',
          creation_date,
          question,
        }

        const botHistory: IChatbotHistory = {
          dialogue_id,
          email,
          type: 'chatbot',
          creation_date,
          answer,
        }

        addHistoryToChatbot(userHistory)
        addHistoryToChatbot(botHistory)
      })
    }
    fetchData()
  }, [])

  const registerQuestionAndAnswerChatbot = async (text: string) => {
    console.log('registerQuestionAndAnswerChatbot:', text)

    const historyQuestion: IChatbotHistory = {
      type: 'user',
      question: {
        id: undefined,
        value: text,
      },
    }

    setChatbotHistory(currentValue => [...currentValue, historyQuestion])
    setChatbotInput('')

    const response = await chatbotService.sendMessage(text, userEmail)

    console.log('response: ', response)

    // const answerObj = await questionsService.get(text)

    // if (answerObj) {
    //   const historyAnswer: ChatbotHistoryProps = {
    //     name: 'Chatbot Albertinho',
    //     text: answerObj.answer,
    //     type: 'chatbot',
    //   }

    //   setChatbotHistory(currentValue => [...currentValue, historyAnswer])
    // }
    // else {
    //   const historyAnswer: ChatbotHistoryProps = {
    //     name: 'Chatbot Albertinho',
    //     text: 'Infelizmente não estou preparado para responder essa pergunta.',
    //     type: 'chatbot',
    //   }

    //   setChatbotHistory(currentValue => [...currentValue, historyAnswer])
    // }
  }

  const evaluateResponseMessage = async (like: 'true' | 'false', history: IChatbotHistory) => {
    console.log('evaluateResponseMessage: ', like, history)

    // @TODO: validar os dados antes de fazer a chamada

    await chatbotService.evaluateResponseMessage({
      id: history.answer?.id || '',
      email: history.email || '',
      memory_id: history.dialogue_id || '',
      like,
    })
  }

  const generateQuestionFromAnswer = async (history: IChatbotHistory) => {
    const dialogueId = history.dialogue_id || ''

    // @TODO: validar os dados antes de fazer a chamada

    const response = await chatbotService.generateQuestionFromAnswer(dialogueId)

    const {
      id: dialogue_id,
      email,
      creation_date,
      generated_question,
    } = response

    const questionHistory: IChatbotHistory = {
      dialogue_id,
      email,
      type: 'question',
      creation_date,
      generated_question,
    }

    addHistoryToChatbot(questionHistory)
  }

  return (
    <ChatbotContext.Provider value={{
      isActiveChatbotModal,
      toggleIsActiveChatbotModal,

      chatbotInput,
      setChatbotInput,

      chatbotHistory,
      setChatbotHistory,

      registerQuestionAndAnswerChatbot,
      evaluateResponseMessage,
      generateQuestionFromAnswer,
    }}>
      {children}
    </ChatbotContext.Provider>
  )
}
