
interface IDialogueEvaluation {
  question_id: string
  answer_id: string
  creation_date: string
}

export interface IDialogueResponse {
  id: string
  title: 'Diálogo com Usuário'
  description: string
  email: string
  type: string
  creation_date: string
  properties: {
    name: 'question' | 'answer' | 'like' | 'dislike' | 'sources'
    value: string | IDialogueEvaluation
  }[]
}

interface IQuestionGeneratedProp {
  statement: string
  option_list: {
    id: string
    text: string
    is_correct: boolean
    reason: string
  }[]
}

export interface IQuestionResponse {
  id: string
  title: 'Questão simulada gerada para a fixação do conteúdo.'
  description: string
  email: string
  type: string
  creation_date: string
  properties: {
    name: 'content' | 'generated_question' | 'question_type' | 'answers'
    value: string | IQuestionGeneratedProp
  }[]
}

export interface IEvaluateResponseMessagePayload {
  id: string
  email: string
  memory_id: string
  like: string
}

export interface ISaveGeneratedQuestionPayload {
  question_id: string
  answer_id: string
  origin: string
}
