import { MessageBodyBot } from './MessageBodyBot'
import { MessageBodyUser } from './MessageBodyUser'
import { MessageBodyQuestion } from './MessageBodyQuestion'
import { IChatbotHistory } from '../../../../../interfaces/chatBot'
import './style.css'

interface MessageChatbotProps {
  history: IChatbotHistory
  hiddeActions?: boolean
}

export function MessageChatbot({ history, hiddeActions }: MessageChatbotProps) {
  return (
    <div className="message-chatbot">
      {history.type === 'user'
        ? (
          <MessageBodyUser history={history} />
        )
        : history.type === 'chatbot'
          ? (
            <MessageBodyBot history={history} hiddeActions={hiddeActions} />
          )
          : (
            <MessageBodyQuestion history={history} />
          )
      }
    </div>
  )
}
