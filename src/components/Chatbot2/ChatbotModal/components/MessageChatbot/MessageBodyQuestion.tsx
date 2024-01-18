import { useChatbotContext } from '../../../../../contexts/chatbotContext/useChatbotContext'
import { IChatbotHistory } from '../../../../../interfaces/chatBot'

interface MessageBodyQuestionProps {
  history: IChatbotHistory
}

export function MessageBodyQuestion({ history }: MessageBodyQuestionProps) {
  // const {  } = useChatbotContext()

  const handleQuestionAnswer = () => {
    console.log('handleQuestionAnswer: ', history)
  }

  return (
    <>
      <img
        src="/albertinho.png"
        alt="albertinho"
      />

      <div className='message-chatbot-body'>
        <span className='text-bold'>
          Bot Albertinho
        </span>

        <p>
          {history.generated_question?.title}
        </p>

        <div className='message-chatbot-options'>
          {history.generated_question?.options?.map(option => (
            <li key={option.id}>
              {option.text}
            </li>
          ))}
        </div>

        <div className='message-chatbot-action'>
          <button onClick={handleQuestionAnswer}>
            Responder
          </button>
        </div>
      </div>
    </>
  )
}
