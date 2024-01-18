import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { router } from './routes'
import { AppContextProvider } from './contexts/appContext/AppContextProvider'
import { ChatbotContextProvider } from './contexts/chatbotContext/ChatbotContextProvider'

import './styles/animations.css'
import './styles/scrollbar.css'
import './styles/index.css'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <ChatbotContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </ChatbotContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
)
