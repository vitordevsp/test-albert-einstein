import { apiClient } from '../../lib/Axios/apiClient'
import { Question, QuestionResponse } from './types'

export async function listQuestions(): Promise<Question[]> {
  const { data } = await apiClient.get<QuestionResponse>('questions')
  return data.questions
}
