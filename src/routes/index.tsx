import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { ChatbotPage } from '../pages/chatbot'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chatbot',
    element: <ChatbotPage />,
  },
])
