import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from '@providers/AuthProvider.jsx'
import {ToasterProvider} from '@providers/ToastProvider'

export function App() {

  return( 
     <AuthProvider>
      <ToasterProvider />
      <AppRouter />
     </AuthProvider>
  )
}