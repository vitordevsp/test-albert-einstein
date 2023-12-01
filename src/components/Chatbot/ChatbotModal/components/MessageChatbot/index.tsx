import { ChatbotHistoryProps } from '../../../../../contexts/appContext/AppContext'
import './style.css'

interface MessageChatbotProps {
  chatbotHistory: ChatbotHistoryProps
}

export function MessageChatbot({ chatbotHistory: { name, text, type } }: MessageChatbotProps) {
  const srcImg = type === 'chatbot'
    ? '/albertinho.png'
    : '/albertinho.png'

  return (
    <div className="message-chatbot">
      <img
        src={srcImg}
        alt="albertinho"
      />

      <div className='message-chatbot-text'>
        <span className='text-bold'>
          {name}
        </span>

        <p>
          {text}
        </p>
      </div>
    </div>
  )
}
