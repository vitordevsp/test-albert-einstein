import { Icon } from '../..'
import { useAppContext } from '../../../contexts/appContext/useAppContext'
import { InputChatbot } from './components/InputChatbot'
import { MessageChatbot } from './components/MessageChatbot'
import './style.css'

interface ChatbotModalProps {
  onClose?: () => void
}

export function ChatbotModal({ onClose }: ChatbotModalProps) {
  const { userName, chatbotHistory, setChatbotHistory } = useAppContext()

  return (
    <div className='chatbot-modal-overlay'>
      <div className="chatbot-modal">
        <header>
          <span className='color-white'>
            Chatbot Albertinho
          </span>

          <Icon name='close' onClick={onClose} />
        </header>

        <main>
          <MessageChatbot
            chatbotHistory={{
              name: 'Chatbot Albertinho',
              text: 'Olá, fique a vontade para me fazer uma pergunta. Abaixo eu deixei algumas sugestões de dúvidas comuns.',
              type: 'chatbot',
            }}
          />

          {chatbotHistory.length === 0 && (
            <div>
              {/* sugestoes de perguntas */}
            </div>
          )}

          {chatbotHistory.map(({ name, text, type }, idx) => (
            <MessageChatbot
              key={idx}
              chatbotHistory={{ name, text, type }}
            />
          ))}
        </main>

        <footer>
          <InputChatbot />
        </footer>
      </div>
    </div>
  )
}
