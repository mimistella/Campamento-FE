import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from '@providers/AuthProvider.jsx'

export function App() {

  return( 
     <AuthProvider>
      <AppRouter />
     </AuthProvider>
  )
}