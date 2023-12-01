import { useState } from 'react'
import { Chatbot, Header, TabsNavigation } from '../../components'
import { Documentation, Product, Questions } from './components'
import './style.css'

type TabOptions = 'Perguntas' | 'Produto' | 'Documentação'

export function ChatbotPage() {
  const [tabSelected, setTabSelected] = useState<TabOptions>('Perguntas')

  const tabContent = {
    'Perguntas': <Questions />,
    'Produto': <Product />,
    'Documentação': <Documentation />,
  }

  return (
    <main className="chatbot-page">
      <Header />

      <TabsNavigation
        items={['Perguntas', 'Produto', 'Documentação']}
        selectedItem={tabSelected}
        onChangeItem={(item: string) => setTabSelected(item as TabOptions)}
      />

      {tabContent[tabSelected]}

      <Chatbot />
    </main>
  )
}
