import { QuestionsList } from '../../../../components'
import './style.css'

export function Questions() {
  return (
    <section>
      <p>
        Conforme sugerido no desafio, as perguntas estão mockadas. Para aprimorar a experiência,
        elaborei uma lista interativa com as possíveis perguntas.
      </p>

      <h2 className='questions-title'>
        Perguntas
      </h2>

      <QuestionsList />
    </section>
  )
}
