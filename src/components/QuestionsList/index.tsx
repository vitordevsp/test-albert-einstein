import { toast } from 'react-toastify'
import { Icon } from '../Icon'
import './style.css'

interface QuestionsListProps {
  items: {
    question: string
  }[]
}

export function QuestionsList({ items }: QuestionsListProps) {
  const copyToTerminal = () => toast('Texto inserido no chatbot!')

  const copyToClipboard = () => toast('Texto copiado para a área de transferências!')

  return (
    <section className="questions-list">
      {items.map(({ question }) => (
        <div key={question} className="question-item">
          <span className='text-semibold'>
            {question}
          </span>

          <div className='question-item-icons'>
            <Icon name='terminal' onClick={copyToTerminal} />

            <Icon name='clipboard' onClick={copyToClipboard} />
          </div>
        </div>
      ))}
    </section>
  )
}
