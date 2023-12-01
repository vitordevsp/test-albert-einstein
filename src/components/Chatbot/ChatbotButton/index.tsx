import './style.css'

interface ChatbotButtonProps {
  onClick?: () => void
}

export function ChatbotButton({ onClick }: ChatbotButtonProps) {
  return (
    <div className="chatbot-button" onClick={onClick}>
      <img src="/albertinho.png" alt="chatbot-albertinho" />
    </div>
  )
}
