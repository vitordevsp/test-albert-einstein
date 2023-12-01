import { Icon, Tag } from '../..'
import { InputChatbot } from './components/InputChatbot'
import { MessageChatbot } from './components/MessageChatbot'
import { useAppContext } from '../../../contexts/appContext/useAppContext'
import './style.css'

interface ChatbotModalProps {
  onClose?: () => void
}

export function ChatbotModal({ onClose }: ChatbotModalProps) {
  const { questions, chatbotHistory, registerQuestionAndAnswerChatbot } = useAppContext()

  return (
    <div className='chatbot-modal-overlay'>
      <div className="chatbot-modal">
        <header>
          <span className='color-white text-bold'>
            Chatbot Albertinho
          </span>

          <Icon name='close' onClick={onClose} />
        </header>

        <main>
          <div>
            <MessageChatbot
              chatbotHistory={{
                name: 'Chatbot Albertinho',
                text: 'Olá, fique a vontade para me fazer uma pergunta. Abaixo eu deixei algumas sugestões de dúvidas comuns.',
                type: 'chatbot',
              }}
            />

            {chatbotHistory.length === 0 && (
              <div className='suggested-questions'>
                {(questions.slice(0, 3)).map(({ question }) => (
                  <Tag
                    text={question}
                    onClick={registerQuestionAndAnswerChatbot}
                  />
                ))}
              </div>
            )}
          </div>

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
