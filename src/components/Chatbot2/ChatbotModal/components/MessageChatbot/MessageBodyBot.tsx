import { SlDislike, SlLike } from 'react-icons/sl'
import { useChatbotContext } from '../../../../../contexts/chatbotContext/useChatbotContext'
import { IChatbotHistory } from '../../../../../interfaces/chatBot'
import { useState } from 'react'
import { Spinner } from '../../../..'

interface MessageBodyBotProps {
  history: IChatbotHistory
  hiddeActions?: boolean
}

export function MessageBodyBot({ history, hiddeActions }: MessageBodyBotProps) {
  const [loadingObj, setLoadingObj] = useState({
    action: '',
    loading: false,
  })

  const { evaluateResponseMessage, generateQuestionFromAnswer } = useChatbotContext()

  const handleEvaluateResponseMessage = async (like: 'true' | 'false', history: IChatbotHistory) => {
    setLoadingObj({
      action: like,
      loading: true,
    })

    await evaluateResponseMessage(like, history)

    setLoadingObj({
      action: like,
      loading: false,
    })
  }

  const handleGenerateQuestionFromAnswer = async (history: IChatbotHistory) => {
    setLoadingObj({
      action: 'question',
      loading: true,
    })

    await generateQuestionFromAnswer(history)

    setLoadingObj({
      action: 'question',
      loading: false,
    })
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
          {history.answer?.value}
        </p>

        {!hiddeActions && (
          <div className='message-chatbot__action'>
            <button
              onClick={() => handleEvaluateResponseMessage('true', history)}
              disabled={loadingObj.action === 'true' && loadingObj.loading}
            >
              {loadingObj.action === 'true' && loadingObj.loading
                ? <Spinner />
                : <SlLike />
              }
            </button>

            <button
              onClick={() => handleEvaluateResponseMessage('false', history)}
              disabled={loadingObj.action === 'false' && loadingObj.loading}
            >
              {loadingObj.action === 'false' && loadingObj.loading
                ? <Spinner />
                : <SlDislike />
              }
            </button>

            <button
              onClick={() => handleGenerateQuestionFromAnswer(history)}
              disabled={loadingObj.action === 'question' && loadingObj.loading}
            >
              Testar conhecimento
              {loadingObj.action === 'question' && loadingObj.loading && (
                <>
                  <div style={{ width: '8px' }}></div>
                  <Spinner />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
