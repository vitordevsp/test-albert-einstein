import { toast } from 'react-toastify'
import { Icon } from '../Icon'
import { useAppContext } from '../../contexts/appContext/useAppContext'
import './style.css'

export function QuestionsList() {
  const { setChatbotInput, toggleIsActiveChatbotModal, questions } = useAppContext()

  const copyToTerminal = (text: string) => {
    setChatbotInput(text)
    toast('Texto inserido no chatbot!')
    toggleIsActiveChatbotModal()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast('Texto copiado para a área de transferências!')
  }

  return (
    <section className="questions-list">
      {questions.map(({ question }) => (
        <div key={question} className="question-item">
          <span className='text-semibold'>
            {question}
          </span>

          <div className='question-item-icons'>
            <Icon name='terminal' onClick={() => copyToTerminal(question)} />

            <Icon name='clipboard' onClick={() => copyToClipboard(question)} />
          </div>
        </div>
      ))}
    </section>
  )
}
