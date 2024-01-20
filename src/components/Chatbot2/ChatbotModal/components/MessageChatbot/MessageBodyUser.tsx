import { IChatbotHistory } from '../../../../../interfaces/chatBot'

interface MessageBodyUserProps {
  history: IChatbotHistory
}

export function MessageBodyUser({ history }: MessageBodyUserProps) {
  return (
    <>
      <img
        src="/userImg.png"
        alt="albertinho"
      />

      <div className='message-chatbot__body'>
        <span className='text-bold'>
          Usuário
        </span>

        <p>
          {history.question?.value}
        </p>
      </div>
    </>
  )
}
