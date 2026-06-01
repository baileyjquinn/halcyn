import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SouthEndPlumbingDemo from './templates/SouthEndPlumbingDemo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SouthEndPlumbingDemo />
  </StrictMode>,
)