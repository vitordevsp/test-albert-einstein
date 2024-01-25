import { useState } from 'react'
import { toast } from 'react-toastify'
import { SlDislike, SlLike } from 'react-icons/sl'
import { useChatbotContext } from '../../../../../contexts/chatbotContext/useChatbotContext'
import { IChatbotHistory } from '../../../../../interfaces/chatBot'
import { Spinner, TextToHTML } from '../../../..'

interface MessageBodyBotProps {
  history: IChatbotHistory
}

export function MessageBodyBot({ history }: MessageBodyBotProps) {
  const [loadingObj, setLoadingObj] = useState({
    action: '',
    loading: false,
  })

  const { evaluateResponseMessage, generateQuestionFromAnswer } = useChatbotContext()

  const handleEvaluateResponseMessage = async (like: 'true' | 'false', history: IChatbotHistory) => {
    try {
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
    catch (error) {
      toast.error('Erro ao avaliar a resposta do bot.')
      console.error('handleEvaluateResponseMessage: ', error)
    }
    finally {
      setLoadingObj({
        action: like,
        loading: false,
      })
    }
  }

  const handleGenerateQuestionFromAnswer = async (history: IChatbotHistory) => {
    try {
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
    catch (error) {
      toast.error('Erro ao gerar a pergunta para testar o conhecimento.')
      console.error('handleEvaluateResponseMessage: ', error)
    }
    finally {
      setLoadingObj({
        action: 'question',
        loading: false,
      })
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

        {history.answer?.is_loading
          ? (
            <Spinner />
          )
          : (
            <TextToHTML text={history.answer?.value || '("indefinido")'} />
          )
        }

        {!history.answer?.hidde_actions && (
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
                <Spinner style={{ width: '8px' }} />
              )}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
