import { useState } from 'react'
import { useChatbotContext } from '../../../../../contexts/chatbotContext/useChatbotContext'
import { IChatbotHistory, IQuestionOption } from '../../../../../interfaces/chatBot'

interface MessageBodyQuestionProps {
  history: IChatbotHistory
}

export function MessageBodyQuestion({ history }: MessageBodyQuestionProps) {
  const { saveGeneratedQuestionAnswer } = useChatbotContext()

  const [optionSeleted, setOptionSelected] = useState<IQuestionOption | null>(null)
  const [questionAnswered, setQuestionAnswered] = useState(false)

  const handleAnswerSelection = (option: IQuestionOption) => {
    if (questionAnswered) return
    setOptionSelected(option)
  }

  const handleQuestionAnswer = () => {
    if (!optionSeleted) return
    saveGeneratedQuestionAnswer(optionSeleted)
    setQuestionAnswered(true)
  }

  return (
    <>
      <img
        src="/albertinho.png"
        alt="albertinho"
      />

      <div className='message-chatbot__body'>
        <span className='text-bold'>
          Bot Albertinho
        </span>

        <p>
          {history.generated_question?.title}
        </p>

        <ul className='message-chatbot__list-options'>
          {history.generated_question?.options?.map(option => {
            const selected = optionSeleted?.id === option.id ? 'true' : 'false'

            return (
              <li
                key={option.id}
                className={'message-chatbot__list-options__item'}
                onClick={() => handleAnswerSelection(option)}
                data-selected={selected}
              >
                {option.text}
              </li>
            )
          })}
        </ul>

        {!questionAnswered
          ? (
            <div className='message-chatbot__action'>
              <button onClick={handleQuestionAnswer}>
                Responder
              </button>
            </div>
          )
          : (
            <div
              className='message-chatbot__alert'
              data-variant={optionSeleted?.is_correct ? 'success' : 'error'}
            >
              <span>
                <b>Justificativa</b>
              </span>

              <p>
                {optionSeleted?.reason}
              </p>
            </div>
          )
        }
      </div>
    </>
  )
}