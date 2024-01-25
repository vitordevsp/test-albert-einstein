import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useChatbotContext } from '../../../../../contexts/chatbotContext/useChatbotContext'
import { IChatbotHistory, IQuestionOption } from '../../../../../interfaces/chatBot'
import { Spinner } from '../../../..'

interface MessageBodyQuestionProps {
  history: IChatbotHistory
}

export function MessageBodyQuestion({ history }: MessageBodyQuestionProps) {
  const [loading, setLoading] = useState(false)

  const { saveGeneratedQuestionAnswer } = useChatbotContext()

  const [optionSeleted, setOptionSelected] = useState<IQuestionOption | null>(null)
  const [questionAnswered, setQuestionAnswered] = useState(false)

  useEffect(() => {
    if (history.generated_question?.selected_option) {
      const { selected_option } = history.generated_question
      setOptionSelected(selected_option)
      setQuestionAnswered(true)
    }
  }, [history])

  const handleAnswerSelection = (option: IQuestionOption) => {
    if (questionAnswered) return
    setOptionSelected(option)
  }

  const handleQuestionAnswer = async () => {
    if (!optionSeleted) {
      toast.warn('Selecione uma opção.')
      return
    }

    try {
      const dialogueId = history.dialogue_id || ''
      setLoading(true)

      await saveGeneratedQuestionAnswer(dialogueId, optionSeleted)
      setQuestionAnswered(true)
    }
    catch (error) {
      toast.error('Erro ao persistir a resposta.')
      setQuestionAnswered(true) // remover quando a API funcionar
      console.error('MessageBodyQuestion > handleQuestionAnswer: ', error)
    }
    finally {
      setLoading(false)
    }
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
              <button
                onClick={handleQuestionAnswer}
                disabled={loading}
              >
                Responder

                {loading && (
                  <Spinner style={{ marginLeft: '8px' }} />
                )}
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
