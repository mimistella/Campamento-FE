import '@coreui/coreui/dist/css/coreui.min.css'
import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.jsx'
import { MyThemeProvider } from '@providers/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <MyThemeProvider>
      <App />
    </MyThemeProvider>
  </StrictMode>,
)
