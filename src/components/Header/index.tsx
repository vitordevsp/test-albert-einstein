import { Logo } from '..'
import './style.css'

export function Header() {
  return (
    <header className="header">
      <Logo />

      <div>
        <h1>
          Chatbot Albertinho
        </h1>

        <h3 className='color-gray-1'>
          Desafio Hospital Israelita Albert Einstein
        </h3>
      </div>
    </header>
  )
}
