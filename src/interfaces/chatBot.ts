export type IDialogueEvaluationAction = undefined | 'like' | 'dislike'

export interface IDialogueAnswer {
  id?: undefined
  value?: string
  sources?: {
    content: string
    metadata_list: string[]
  }[]
  evaluation?: {
    action?: IDialogueEvaluationAction
    question_id?: string
    answer_id?: string
    creation_date?: string
  }
}

export interface IDialogue {
  id: string
  title: string
  description: string
  email: string
  creation_date: string
  question: {
    id?: undefined
    value?: string
  }
  answer: IDialogueAnswer
}

export interface IQuestionOption {
  id: string
  text: string
  is_correct: boolean
  reason: string
}

export interface IQuestion {
  id: string
  title: string
  description: string
  email: string
  creation_date: string
  generated_question: {
    title?: string
    options?: IQuestionOption[]
  }
}

export interface IChatbotHistory {
  type: 'user' | 'chatbot'
  dialogue_id?: string
  email?: string
  creation_date?: string
  question?: {
    id?: undefined
    value?: string
  }
  answer?: IDialogueAnswer
}
