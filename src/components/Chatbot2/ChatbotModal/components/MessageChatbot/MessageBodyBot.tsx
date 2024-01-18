import { SlDislike, SlLike } from 'react-icons/sl'
import { useChatbotContext } from '../../../../../contexts/chatbotContext/useChatbotContext'
import { IChatbotHistory } from '../../../../../interfaces/chatBot'

interface MessageBodyBotProps {
  history: IChatbotHistory
  hiddeActions?: boolean
}

export function MessageBodyBot({ history, hiddeActions }: MessageBodyBotProps) {
  const { evaluateResponseMessage, generateQuestionFromAnswer } = useChatbotContext()

  return (
    <>
      <img
        src="/albertinho.png"
        alt="albertinho"
      />

      <div className='message-chatbot-body'>
        <span className='text-bold'>
          Bot Albertinho
        </span>

        <p>
          {history.answer?.value}
        </p>

        {!hiddeActions && (
          <div className='message-chatbot-action'>
            <button onClick={() => evaluateResponseMessage('true', history)}>
              <SlLike />
            </button>

            <button onClick={() => evaluateResponseMessage('false', history)}>
              <SlDislike />
            </button>

            <button onClick={() => generateQuestionFromAnswer(history)}>
              Testar conhecimento
            </button>
          </div>
        )}
      </div>
    </>
  )
}
