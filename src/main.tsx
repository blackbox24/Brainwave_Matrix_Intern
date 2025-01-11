import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { Dapp } from './components/Dapp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Dapp />
  </StrictMode>,
)
