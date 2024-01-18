import { useRef } from 'react'
import { toast } from 'react-toastify'
import { Icon } from '../../../..'
import { useChatbotContext } from '../../../../../contexts/chatbotContext/useChatbotContext'
import './style.css'

export function InputChatbot() {
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    chatbotInput,
    setChatbotInput,
    registerQuestionAndAnswerChatbot,
  } = useChatbotContext()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!chatbotInput) {
      toast('Digite uma mensagem!')
      inputRef.current?.focus()
      return
    }

    registerQuestionAndAnswerChatbot(chatbotInput)
    inputRef.current?.focus()

    setTimeout(() => {
      const mainElement = document.getElementById('chatbot-modal-main')
      if (!mainElement) return

      mainElement.scrollTop = mainElement.scrollHeight
    }, 200)
  }

  return (
    <form className='input-chatbot' onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={chatbotInput}
        onChange={event => setChatbotInput(event.currentTarget.value)}
        placeholder='Digite uma mensagem...'
        autoFocus
      />

      <button
        type='submit'
        className='input-chatbot-submit'
      >
        <Icon name='send' />
      </button>
    </form>
  )
}
