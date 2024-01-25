import { useEffect, useState } from 'react'
import { ChatbotContext } from './ChatbotContext'
import { chatbotService } from '../../services/ChatbotService'
import { IChatbotHistory, IQuestionOption } from '../../interfaces/chatBot'
import { IDialogueResponse, ISaveGeneratedQuestionPayload } from '../../interfaces/chatBotAPI'

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

  const scrollChatbotToTheEnd = () => {
    setTimeout(() => {
      const mainElement = document.getElementById('chatbot-modal-main')
      if (!mainElement) return
      mainElement.scrollTop = mainElement.scrollHeight
    }, 200)
  }

  const addHistoryToChatbot = (history: IChatbotHistory) => {
    setChatbotHistory(currentValue => [...currentValue, history])
    scrollChatbotToTheEnd()
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

  const sendMessageAndReceiveResponse = async (text: string, email: string, temporaryUUID: string) => {
    const reader = await chatbotService.sendMessageAndReceiveResponse(text, email)

    let completeText = ''
    let jsonString = ''

    reader?.read()
      .then(function processText({ done, value: chunk }): any {
        const chunkText = new TextDecoder().decode(chunk)
        const isJson = chunkText.includes('{')

        if (isJson) {
          jsonString = chunkText
        }
        else {
          completeText += chunkText
        }

        setChatbotHistory(currentValue => {
          const newValue = [...currentValue]
          const lastHistory = newValue.pop()

          if (lastHistory && lastHistory.dialogue_id === temporaryUUID) {
            lastHistory.answer = {
              ...lastHistory.answer,
              value: completeText,
              is_loading: false,
            }

            newValue.push(lastHistory)
          }

          return newValue
        })

        scrollChatbotToTheEnd()

        if (done) {
          try {
            const {
              id: dialogue_id,
              email,
              creation_date,
            }: IDialogueResponse = JSON.parse(jsonString)

            setChatbotHistory(currentValue => {
              const newValue = currentValue.map(history => {
                if (history.dialogue_id === temporaryUUID) {
                  const newHistory: IChatbotHistory = {
                    ...history,
                    dialogue_id,
                    email,
                    creation_date,
                    answer: {
                      ...history.answer,
                      hidde_actions: false,
                    },
                  }

                  return newHistory
                }

                return history
              })

              return newValue
            })
          }
          catch (error) { }

          return
        }

        return reader.read().then(processText)
      })
      .catch(() => {
        setChatbotHistory(currentValue => {
          const newValue = [...currentValue]
          const lastHistory = newValue.pop()

          if (lastHistory && lastHistory.dialogue_id === temporaryUUID) {
            lastHistory.answer = {
              ...lastHistory.answer,
              value: 'Erro ao gerar a resposta...',
              is_loading: false,
            }

            newValue.push(lastHistory)
          }

          return newValue
        })
      })
  }

  const registerQuestionAndAnswerChatbot = async (text: string) => {
    const temporaryUUID = crypto.randomUUID()

    const historyQuestion: IChatbotHistory = {
      type: 'user',
      dialogue_id: temporaryUUID,
      question: {
        id: undefined,
        value: text,
      },
    }

    addHistoryToChatbot(historyQuestion)
    setChatbotInput('')

    const historyResponse: IChatbotHistory = {
      type: 'chatbot',
      dialogue_id: temporaryUUID,
      answer: {
        id: undefined,
        value: undefined,
        is_loading: true,
        hidde_actions: true,
      },
    }

    addHistoryToChatbot(historyResponse)
    sendMessageAndReceiveResponse(text, userEmail, temporaryUUID)
  }

  const evaluateResponseMessage = async (like: 'true' | 'false', history: IChatbotHistory) => {
    await chatbotService.evaluateResponseMessage({
      id: history.answer?.id || '',
      email: history.email || '',
      memory_id: history.dialogue_id || '',
      like,
    })

    // @TODO: alterar o estado local da avaliação
  }

  const generateQuestionFromAnswer = async (history: IChatbotHistory) => {
    const dialogueId = history.dialogue_id || ''

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
