import { useEffect } from 'react'
import { InputChatbot } from './components/InputChatbot'
import { MessageChatbot } from './components/MessageChatbot'
import { Icon, Spinner } from '../..'
import { useChatbotContext } from '../../../contexts/chatbotContext/useChatbotContext'
import './style.css'

interface ChatbotModalProps {
  onClose?: () => void
}

export function ChatbotModal({ onClose }: ChatbotModalProps) {
  const { chatbotHistory, chatbotHistoryLoading } = useChatbotContext()

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
          <MessageChatbot
            history={{
              type: 'chatbot',
              answer: {
                value: 'Olá, fique a vontade para me fazer uma pergunta.',
              },
            }}
            hiddeActions
          />

          {chatbotHistoryLoading && (
            <div className='chatbot-modal-main-loading'>
              <b>Carregando histórico</b>
              <Spinner />
            </div>
          )}

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
