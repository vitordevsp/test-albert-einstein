import { useRef } from 'react'
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

  const submit = () => {
    registerQuestionAndAnswerChatbot(chatbotInput)
    inputRef.current?.focus()
  }

  return (
    <div className='input-chatbot'>
      <input
        ref={inputRef}
        value={chatbotInput}
        onChange={event => setChatbotInput(event.currentTarget.value)}
        placeholder='Digite uma mensagem...'
        autoFocus
      />

      <Icon
        name='send'
        onClick={submit}
      />
    </div>
  )
}
