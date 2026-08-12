import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { EditModeProvider } from 'edit-kit'
import 'edit-kit/styles.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EditModeProvider apiBase="https://www.shankshub.page">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EditModeProvider>
  </StrictMode>,
)
