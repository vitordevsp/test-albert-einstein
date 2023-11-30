import { useEffect } from "react"
import { listQuestions } from "../../services/QuestionsService"

export function ChatbotPage() {
  useEffect(() => {
    console.log('useEffect')

    async function fetchData() {
      const data = await listQuestions()
      console.log('data: ', data)
    }
    fetchData()
  }, [])

  return (
    <main>
      <h1>ChatbotPage</h1>
    </main>
  )
}
