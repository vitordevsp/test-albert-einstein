import { Button, Input } from '../../components'
import { useNavigate } from 'react-router-dom'
import './style.css'

export function HomePage() {
  const navigate = useNavigate();

  const navigateToNextPage = () => navigate('/chatbot')

  return (
    <main className='home-page'>
      <section className='home-page-container'>
        <img className='logo' src="logo.png" alt="logo" />

        <div className='texts-container'>
          <h1>
            Chatbot Albertinho
          </h1>

          <h3 className='color-gray-1'>
            Desafio Hospital Israelita Albert Einstein
          </h3>

          <h5 className='color-gray-2'>
            Criando boas experiência com o desenvolvimento web
          </h5>
        </div>

        <div className='form-container'>
          <Input placeholder='Digite seu nome:' autoFocus />

          <Button onClick={navigateToNextPage}>
            Começar
          </Button>
        </div>

        <h6 className='developed-by color-gray-3'>
          Desenvolvido por

          <a
            href="http://vitordevsp.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className='color-gray-2 text-bold'
          >
            Vitor DevSP
          </a>
        </h6>
      </section>
    </main>
  )
}
