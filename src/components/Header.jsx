import React, { useState, useEffect } from 'react'
import { MenuIcon, XIcon, ShieldIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom';
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setHideHeader(false);
      window.onscroll = null;
      return;
    }
    function onScroll() {
      if (window.scrollY > 10) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll(); // Para inicializar correctamente
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  return (
    <header className={`bg-amber-800/90 text-amber-50 sticky top-0 z-50 shadow-md transition-all duration-500 ${hideHeader ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <ShieldIcon className="h-10 w-10 text-amber-500 group-hover:text-amber-400 transition-colors" />
          <h1 className="text-xl md:text-2xl font-bold font-serif group-hover:text-amber-300 transition-colors">
            Campamento mestizo
          </h1>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className="hover:text-amber-300 transition-colors font-medium"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Inicio
          </Link>
          <a
            href="/"
            className="hover:text-amber-300 transition-colors"
            onClick={e => {
              e.preventDefault();
              window.location.assign('/#about');
            }}
          >
            Nosotros
          </a>
          <a
            href="/"
            className="hover:text-amber-300 transition-colors"
            onClick={e => {
              e.preventDefault();
              window.location.assign('/#location');
            }}
          >
            Ubicación
          </a>
          <Link to="/login" className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-md font-medium transition-colors text-center">Iniciar Sesión</Link>
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
          <Link
            to="/"
            className="hover:text-amber-300 transition-colors font-medium"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
          >
            Inicio
          </Link>
          <a
            href="/"
            className="hover:text-amber-300 transition-colors"
            onClick={e => {
              e.preventDefault();
              window.location.assign('/#about');
              setMobileMenuOpen(false);
            }}
          >
            Nosotros
          </a>
          <a
            href="/"
            className="hover:text-amber-300 transition-colors"
            onClick={e => {
              e.preventDefault();
              window.location.assign('/#location');
              setMobileMenuOpen(false);
            }}
          >
            Ubicación
          </a>
          <Link to="/login" className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-md font-medium transition-colors text-left">Iniciar sesión</Link>
        </nav>
      )}
    </header>
  )
}
