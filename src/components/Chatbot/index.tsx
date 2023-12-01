import { ChatbotButton } from './ChatbotButton'
import { ChatbotModal } from './ChatbotModal'
import { useAppContext } from '../../contexts/appContext/useAppContext'

export function Chatbot() {
  const { isActiveChatbotModal, toggleIsActiveChatbotModal } = useAppContext()

  return (
    <>
      {isActiveChatbotModal
        ? (
          <ChatbotModal onClose={toggleIsActiveChatbotModal} />
        )
        : (
          <ChatbotButton onClick={toggleIsActiveChatbotModal} />
        )
      }
    </>
  )
}
