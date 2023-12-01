import { useState } from 'react'
import { ChatbotButton } from './ChatbotButton'
import { ChatbotModal } from './ChatbotModal'

export function Chatbot() {
  const [isActive, setIsActive] = useState(false)

  const toggleIsActive = () => setIsActive(currentValue => !currentValue)

  return (
    <>
      {isActive
        ? (
          <ChatbotModal onClose={toggleIsActive} />
        )
        : (
          <ChatbotButton onClick={toggleIsActive} />
        )
      }
    </>
  )
}
