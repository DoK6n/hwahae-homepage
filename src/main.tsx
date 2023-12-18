import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import { Home } from './pages/index.tsx'
import GlobalStyles from './GlobalStyles.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <Home />
  </React.StrictMode>,
)
