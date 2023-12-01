import { Icon } from '../..'
import { useAppContext } from '../../../contexts/appContext/useAppContext'
import './style.css'

interface ChatbotModalProps {
  onClose?: () => void
}

export function ChatbotModal({ onClose }: ChatbotModalProps) {
  const { userName } = useAppContext()

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
          {userName}
        </main>

        <footer>
          <div className='input-container'>
            <input placeholder='Digite uma mensagem...' />

            <Icon name='send' />
          </div>
        </footer>
      </div>
    </div>
  )
}
