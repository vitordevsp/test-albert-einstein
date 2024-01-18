import { Icon, Tag } from '../..'
import { InputChatbot } from './components/InputChatbot'
import { MessageChatbot } from './components/MessageChatbot'
import { useChatbotContext } from '../../../contexts/chatbotContext/useChatbotContext'
import './style.css'
import { useEffect } from 'react'

interface ChatbotModalProps {
  onClose?: () => void
}

export function ChatbotModal({ onClose }: ChatbotModalProps) {
  const { chatbotHistory } = useChatbotContext()

  useEffect(() => {
    const mainElement = document.getElementById('chatbot-modal-main')
    if (!mainElement) return

    mainElement.scrollTop = mainElement.scrollHeight
  }, [])

  return (
    <>
      <div className='chatbot-modal-overlay' onClick={onClose} />

      <div className="chatbot-modal">
        <header>
          <span className='color-white text-bold'>
            Chatbot Albertinho
          </span>

          <Icon name='close' onClick={onClose} />
        </header>

        <main id='chatbot-modal-main'>
          <div>
            <MessageChatbot
              history={{
                type: 'chatbot',
                answer: {
                  value: 'Olá, fique a vontade para me fazer uma pergunta.',
                },
              }}
              hiddeActions
            />
          </div>

          {chatbotHistory.map((history, idx) => (
            <MessageChatbot
              key={`${history.dialogue_id}-${idx}`}
              history={history}
            />
          ))}
        </main>

        <footer>
          <InputChatbot />
        </footer>
      </div>
    </>
  )
}
