import { useRef } from 'react'
import { toast } from 'react-toastify'
import { Icon } from '../../../..'
import { useAppContext } from '../../../../../contexts/appContext/useAppContext'
import './style.css'

export function InputChatbot() {
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    chatbotInput,
    setChatbotInput,
    registerQuestionAndAnswerChatbot,
  } = useAppContext()

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
      const mainTest = document.getElementById('chatbot-modal-main')
      if (!mainTest) return

      mainTest.scrollTop = mainTest.scrollHeight
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
