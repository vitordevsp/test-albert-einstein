import { apiClient } from '../../lib/Axios/apiClient'
import { Question, QuestionResponse } from './types'

export const questionsService = {
  list: async (): Promise<Question[]> => {
    const { data } = await apiClient.get<QuestionResponse>('questions')
    return data.questions
  },

  get: async (question: string): Promise<Question | null> => {
    const { data } = await apiClient.get<QuestionResponse>('questions')

    const questionObj = data.questions.find((item) => item.question === question)

    return questionObj || null
  },
}
