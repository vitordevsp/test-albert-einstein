import { chatBotAPI } from '../../lib/Axios/chatBotAPI'
import { handleDataGenerateQuestionFromAnswer, handleDataHistoryList } from './handleData'
import { IDialogue, IQuestion } from '../../interfaces/chatBot'
import { IDialogueResponse, IEvaluateResponseMessagePayload, IQuestionResponse, ISaveGeneratedQuestionPayload } from '../../interfaces/chatBotAPI'

let isBotResponding = false
let addedButtons = false
const botMessageElement = null

let isJson = false
let isError = false
let botResponseChunks = []
let jsonBuffer = []
let errorBuffer = [] as any[]
let jsonObj = null as any

export const chatbotService = {
  historyList: async (email: string): Promise<IDialogue[]> => {
    try {
      const { data } = await chatBotAPI.get<IDialogueResponse[]>('/get_history', {
        params: {
          email,
        },
      })

      const mappedData = handleDataHistoryList(data)

      return mappedData
    } catch (error) {
      // @TODO: error handling
      throw error
    }
  },

  sendMessage: async (input: string, email: string) => {
    return fetch('http://localhost:8000/stream_response?' + new URLSearchParams({ input, email }).toString())
      .then((response) => { // Retrieve its body as ReadableStream
        const reader = response.body?.getReader()
        // read() returns a promise that resolves when a value has been received
        reader?.read().then(function pump({ done, value }: any): any {
          const chunk = new TextDecoder().decode(value)

          if (done) {
            // Do something with last chunk of data then exit reader
            console.log('fim')

            isBotResponding = false
            botResponseChunks = []

            if (jsonBuffer.length > 0) {
              console.log('appendMemoryAndSources: ', JSON.parse(jsonObj))
            }

            if (errorBuffer.length > 0) {
              console.log('handleErrorResponse: ', errorBuffer.join(''))
            }

            jsonBuffer = []
            errorBuffer = []
            isJson = false
            addedButtons = false

            return
          }

          isBotResponding = true
          if (chunk.includes('{')) {
            isJson = true
            jsonObj = chunk
          }
          if (chunk === 'is_error') {
            isError = true
            return
          }

          if (isJson) {
            jsonBuffer.push(chunk)
          } else if (isError) {
            errorBuffer.push(chunk)
          } else {
            botResponseChunks.push(chunk)
            console.log('Bot', chunk)
          }

          return reader.read().then(pump)
        })
      })
      .catch((err) => console.error(err))
  },

  evaluateResponseMessage: async (payload: IEvaluateResponseMessagePayload): Promise<true> => {
    try {
      await chatBotAPI.post('/persist_feedback', payload)

      return true
    } catch (error) {
      // @TODO: error handling
      throw error
    }
  },

  generateQuestionFromAnswer: async (dialogueId: string): Promise<IQuestion[]> => {
    const questionType = 'interpretative'

    try {
      const { data } = await chatBotAPI.get<IQuestionResponse[]>('/generate_question', {
        params: {
          memory_id: dialogueId,
          question_type: questionType,
        },
      })

      const mappedData = handleDataGenerateQuestionFromAnswer(data)

      return mappedData
    } catch (error) {
      // @TODO: error handling
      throw error
    }
  },

  saveGeneratedQuestion: async (payload: ISaveGeneratedQuestionPayload) => {
    try {
      await chatBotAPI.post('/persist_answer', payload)

      return true
    } catch (error) {
      // @TODO: error handling
      throw error
    }
  },

  getSpeech: async () => {
    // /get_speech
  },
}
