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
          <span>
            {question}
          </span>

          <div>
            <div className="icon-terminal"></div>
            <div className="icon-copy-clipboard"></div>
          </div>
        </div>
      ))}
    </section>
  )
}
