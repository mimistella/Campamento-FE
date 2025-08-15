import React from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Location } from './components/Location'
import { Footer } from './components/Footer'
export function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Location />
      </main>
      <Footer />
    </div>
  )}