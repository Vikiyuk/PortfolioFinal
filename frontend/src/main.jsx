import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StockProvider } from './context/StockContext'  // ✅ import your context provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StockProvider>   {/* ✅ wrap App in StockProvider */}
      <App />
    </StockProvider>
  </StrictMode>,
)
