import '@coreui/coreui/dist/css/coreui.min.css'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProviders } from './providers/AppProviders';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.jsx'
import { DashboardProvider } from './providers/DashboardProvider.jsx';
import { MyThemeProvider } from '@providers/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <MyThemeProvider>
    <DashboardProvider>
      <App />
    </DashboardProvider>
    </MyThemeProvider>
  </StrictMode>,
)
