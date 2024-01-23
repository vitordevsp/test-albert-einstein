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
    enableBotVoice,
    toggleEnableBotVoice,
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

      {/* <button type='button' onClick={toggleEnableBotVoice}>
        <Icon name={enableBotVoice ? 'microphone' : 'outlineMicrophone'} />
      </button> */}

      <button type='submit'>
        <Icon name='send' />
      </button>
    </form>
  )
}
