import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {ThemeContextProvider} from "./context/ThemeContext.tsx";
import {AuthContextProvider} from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeContextProvider>
          <AuthContextProvider>
              <App />
          </AuthContextProvider>
      </ThemeContextProvider>
  </React.StrictMode>,
)
