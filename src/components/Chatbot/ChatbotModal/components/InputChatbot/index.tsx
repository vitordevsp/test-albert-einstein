import { Icon } from '../../../..'
import { useAppContext } from '../../../../../contexts/appContext/useAppContext'
import './style.css'

export function InputChatbot() {
  const {
    chatbotInput,
    setChatbotInput,
  } = useAppContext()

  return (
    <div className='input-chatbot'>
      <input
        value={chatbotInput}
        onChange={event => setChatbotInput(event.currentTarget.value)}
        placeholder='Digite uma mensagem...'
        autoFocus
      />

      <Icon name='send' />
    </div>
  )
}
