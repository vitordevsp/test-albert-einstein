import { useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from '../../components'
import { useAppContext } from '../../contexts/appContext/useAppContext'
import './style.css'

export function HomePage() {
  const { userName, setUserName } = useAppContext()

  const navigate = useNavigate()

  const navigateToNextPage = () => navigate('/chatbot')

  return (
    <main className='home-page'>
      <section className='home-page-container'>
        <Logo />

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
          <Input
            placeholder='Digite seu nome:'
            value={userName}
            onChange={event => setUserName(event.currentTarget.value)}
            autoFocus
          />

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
