import { MessageBodyBot } from './MessageBodyBot'
import { MessageBodyUser } from './MessageBodyUser'
import { MessageBodyQuestion } from './MessageBodyQuestion'
import { IChatbotHistory } from '../../../../../interfaces/chatBot'
import './style.css'

interface MessageChatbotProps {
  history: IChatbotHistory
}

export function MessageChatbot({ history }: MessageChatbotProps) {
  const messagesBodyObj = {
    user: MessageBodyUser,
    chatbot: MessageBodyBot,
    question: MessageBodyQuestion,
  }

  const Component = messagesBodyObj[history.type]

  if (!Component) return null

  return (
    <div className="message-chatbot">
      <Component history={history} />
    </div>
  )
}
