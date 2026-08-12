import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EditModeProvider } from 'edit-kit'
import 'edit-kit/styles.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EditModeProvider apiBase="">
      <App />
    </EditModeProvider>
  </StrictMode>,
)
