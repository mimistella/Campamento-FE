import React, { useState } from 'react'
import { MenuIcon, XIcon, ShieldIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate() 
  return (
    <header className="bg-amber-800/90 text-amber-50 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShieldIcon className="h-10 w-10 text-amber-500" />
          <h1 className="text-xl md:text-2xl font-bold font-serif">
            Campamento mestizo
          </h1>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#about" className="hover:text-amber-300 transition-colors">
            Acerca del camp
          </a>
          <a
            href="#location"
            className="hover:text-amber-300 transition-colors"
          >
            Ubicación
          </a>
          <a href="#faq" className="hover:text-amber-300 transition-colors">
            FAQ
          </a>
          <a href="#prices" className="hover:text-amber-300 transition-colors">
            Precios y tarifas
          </a>
          <button className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-md font-medium transition-colors" 
          onClick={() => navigate('/login')}>
            Iniciar Sesión

          </button>
        </nav>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-amber-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-amber-800 px-4 py-2 flex flex-col space-y-3 pb-4">
          <a href="#about" className="hover:text-amber-300 transition-colors">
            Acerca del camp
          </a>
          <a
            href="#location"
            className="hover:text-amber-300 transition-colors"
          >
            Ubicación
          </a>
          <a href="#faq" className="hover:text-amber-300 transition-colors">
            FAQ
          </a>
          <a href="#prices" className="hover:text-amber-300 transition-colors">
            Precios y tarifas
          </a>
          <button className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-md font-medium transition-colors text-left">
            Iniciar sesión
          </button>
        </nav>
      )}
    </header>
  )
}
