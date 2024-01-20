import { chatBotAPI } from '../../lib/Axios/chatBotAPI'
import {
  handleDataGenerateQuestionFromAnswer,
  handleDataHistoryList,
} from './handleData'
import { IDialogue, IQuestion } from '../../interfaces/chatBot'
import {
  IDialogueResponse,
  IEvaluateResponseMessagePayload,
  IQuestionResponse,
  ISaveGeneratedQuestionPayload,
} from '../../interfaces/chatBotAPI'

let isBotResponding = false
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

  generateQuestionFromAnswer: async (dialogueId: string): Promise<IQuestion> => {
    const questionType = 'interpretative'

    try {
      const { data } = await chatBotAPI.get<IQuestionResponse>('/generate_question', {
        params: {
          memory_id: dialogueId,
          question_type: questionType,
        },
      })

      const mappedData = handleDataGenerateQuestionFromAnswer({
        'id': '0e04becd-7207-4b78-b211-479ecf2f4c50',
        'email': 'simulated_question_thiagoemsantos@gmail.com',
        'creation_date': '2024-01-11T13:29:16.411425',
        'title': 'Questão simulada gerada para a fixação do conteúdo.',
        'description': 'Armazena o conteúdo base, a pergunta gerada, o tipo e as respostas dadas, quando houverem.',
        'type': 'object',
        'properties': [
          {
            'name': 'generated_question',
            'value': {
              'statement': 'Qual é a principal desvantagem do cateter nasal em relação a outros dispositivos de fornecimento de oxigênio?',
              'option_list': [
                {
                  'id': '1',
                  'text': 'Pode causar ressecamento e lesões na mucosa nasal.',
                  'is_correct': true,
                  'reason': 'Correto! O cateter nasal pode causar ressecamento e lesões na mucosa nasal quando utilizado em fluxos mais altos.',
                },
                {
                  'id': '2',
                  'text': 'É um dispositivo complexo e de alto custo.',
                  'is_correct': false,
                  'reason': 'Incorreto. O cateter nasal é um dispositivo simples e de baixo custo, amplamente acessível e útil em diversas situações.',
                },
                {
                  'id': '3',
                  'text': 'Não permite fornecer oxigênio em fluxos mais altos.',
                  'is_correct': false,
                  'reason': 'Incorreto. O cateter nasal permite fornecer oxigênio em fluxos mais altos, porém isso pode causar ressecamento e lesões na mucosa nasal.',
                },
                {
                  'id': '4',
                  'text': 'Não é adequado para uso em pacientes conscientes.',
                  'is_correct': false,
                  'reason': 'Incorreto. O cateter nasal é indicado para pacientes conscientes com insuficiência respiratória, sendo uma opção adequada de fornecimento de oxigênio.',
                },
              ],
            },
          },
        ],
      })

      return mappedData
    } catch (error) {
      // @TODO: error handling
      throw error
    }
  },

  saveGeneratedQuestionAnswer: async (payload: ISaveGeneratedQuestionPayload) => {
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
