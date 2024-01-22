import { useEffect, useState } from 'react'
import { ChatbotContext } from './ChatbotContext'
import { chatbotService } from '../../services/ChatbotService'
import { IChatbotHistory, IQuestionOption } from '../../interfaces/chatBot'
import { ISaveGeneratedQuestionPayload } from '../../interfaces/chatBotAPI'

interface ChatbotContextProviderProps {
  children: React.ReactNode
}

const userEmail = 'thiagoemsantos@gmail.com'

export function ChatbotContextProvider({ children }: ChatbotContextProviderProps) {
  const [isActiveChatbotModal, setIsActiveChatbotModal] = useState(false)
  const toggleIsActiveChatbotModal = () => setIsActiveChatbotModal(value => !value)

  const [chatbotInput, setChatbotInput] = useState('')

  const [enableBotVoice, setEnableBotVoice] = useState(false)
  const toggleEnableBotVoice = () => setEnableBotVoice(value => !value)

  // ----- History -----

  const [chatbotHistory, setChatbotHistory] = useState<IChatbotHistory[]>([])
  const [chatbotHistoryLoading, setChatbotHistoryLoading] = useState(false)

  const addHistoryToChatbot = (history: IChatbotHistory) => {
    setChatbotHistory(currentValue => [...currentValue, history])

    setTimeout(() => {
      const mainElement = document.getElementById('chatbot-modal-main')
      if (!mainElement) return
      mainElement.scrollTop = mainElement.scrollHeight
    }, 200)
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        setChatbotHistoryLoading(true)

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

        setChatbotHistoryLoading(false)
      }

      fetchData()
    }
    catch (error) {
      setChatbotHistoryLoading(false)
    }
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

  const saveGeneratedQuestionAnswer = async (option: IQuestionOption) => {
    console.log('saveGeneratedQuestionAnswer: ', option)

    const payload: ISaveGeneratedQuestionPayload = {
      question_id: '',
      answer_id: '',
      origin: '',
    }

    await chatbotService.saveGeneratedQuestionAnswer(payload)
  }

  return (
    <ChatbotContext.Provider value={{
      isActiveChatbotModal,
      toggleIsActiveChatbotModal,

      chatbotInput,
      setChatbotInput,

      enableBotVoice,
      toggleEnableBotVoice,

      chatbotHistory,
      chatbotHistoryLoading,
      setChatbotHistory,

      registerQuestionAndAnswerChatbot,
      evaluateResponseMessage,
      generateQuestionFromAnswer,
      saveGeneratedQuestionAnswer,
    }}>
      {children}
    </ChatbotContext.Provider>
  )
}
