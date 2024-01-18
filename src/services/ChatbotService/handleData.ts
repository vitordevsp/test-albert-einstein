import { IDialogue, IDialogueEvaluationAction, IQuestion } from '../../interfaces/chatBot'
import { IDialogueResponse, IQuestionResponse } from '../../interfaces/chatBotAPI'

export function handleDataHistoryList(data: IDialogueResponse[]): IDialogue[] {
  const mappedData = data.map<IDialogue>(obj => {
    const {
      id,
      title,
      description,
      email,
      properties,
      creation_date,
    } = obj

    const questionProp = properties.find(prop => prop.name === 'question')
    const answerProp = properties.find(prop => prop.name === 'answer')
    const evaluationLikeProp = properties.find(prop => prop.name === 'like')

    const questionValue = typeof questionProp?.value === 'string' ? questionProp.value : undefined
    const answerValue = typeof answerProp?.value === 'string' ? answerProp.value : undefined

    let evaluationAction: IDialogueEvaluationAction = undefined
    if (evaluationLikeProp) evaluationAction = 'like'

    const evaluationProperties = {
      question_id: undefined as undefined | string,
      answer_id: undefined as undefined | string,
      creation_date: undefined as undefined | string,
    }
    if (evaluationLikeProp && typeof evaluationLikeProp.value === 'object') {
      evaluationProperties.question_id = evaluationLikeProp.value.question_id
      evaluationProperties.answer_id = evaluationLikeProp.value.answer_id
      evaluationProperties.creation_date = evaluationLikeProp.value.creation_date
    }

    return {
      id,
      title,
      description,
      email,
      creation_date,
      question: {
        id: undefined,
        value: questionValue,
      },
      answer: {
        id: undefined,
        value: answerValue,
        sources: undefined,
        evaluation: {
          action: evaluationAction,
          ...evaluationProperties,
        },
      },
    } as IDialogue
  })

  return mappedData
}

export function handleDataGenerateQuestionFromAnswer(data: IQuestionResponse): IQuestion {
  const {
    id,
    title,
    description,
    email,
    properties,
    creation_date,
  } = data

  const generatedQuestionProp = properties.find(prop => prop.name === 'generated_question')

  const questionTitle = typeof generatedQuestionProp?.value === 'object'
    ? generatedQuestionProp?.value.statement : undefined

  const questionOptions = typeof generatedQuestionProp?.value === 'object'
    ? generatedQuestionProp?.value.option_list : undefined

  const mappedData = {
    id,
    title,
    description,
    email,
    creation_date,
    generated_question: {
      title: questionTitle,
      options: questionOptions,
    },
  }

  return mappedData
}
