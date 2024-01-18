import { SlDislike, SlLike } from 'react-icons/sl'
import { useChatbotContext } from '../../../../../contexts/chatbotContext/useChatbotContext'
import { IChatbotHistory } from '../../../../../interfaces/chatBot'
import './style.css'

interface MessageChatbotProps {
  history: IChatbotHistory
  hiddeActions?: boolean
}

export function MessageChatbot({ history, hiddeActions }: MessageChatbotProps) {
  const { evaluateResponseMessage, generateQuestionFromAnswer } = useChatbotContext()

  const type = history.type
  const name = history.type === 'user' ? 'Usuário' : 'Bot Albertinho'

  const srcImg = type === 'chatbot'
    ? '/albertinho.png'
    : '/userImg.png'

  const text = history.type === 'user'
    ? history.question?.value
    : history.answer?.value

  return (
    <div className="message-chatbot">
      <img
        src={srcImg}
        alt="albertinho"
      />

      <div className='message-chatbot-body'>
        <span className='text-bold'>
          {name}
        </span>

        <p>
          {text}
        </p>

        {type === 'chatbot' && !hiddeActions && (
          <div className='message-chatbot-action'>
            <button onClick={() => evaluateResponseMessage('like', history)}>
              <SlLike />
            </button>

            <button onClick={() => evaluateResponseMessage('dislike', history)}>
              <SlDislike />
            </button>

            <button onClick={() => generateQuestionFromAnswer(history)}>
              Testar conhecimento
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
