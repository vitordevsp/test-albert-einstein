import { Icon } from '../Icon'
import './style.css'

interface QuestionsListProps {
  items: {
    question: string
  }[]
}

export function QuestionsList({ items }: QuestionsListProps) {
  return (
    <section className="questions-list">
      {items.map(({ question }) => (
        <div className="question-item">
          <span className='text-semibold'>
            {question}
          </span>

          <div className='question-item-icons'>
            <Icon name='terminal' />
            <Icon name='clipboard' />
          </div>
        </div>
      ))}
    </section>
  )
}
