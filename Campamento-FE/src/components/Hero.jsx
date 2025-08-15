import React from 'react'
import { ChevronRightIcon } from 'lucide-react'
export function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-[80vh] flex items-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
      <div className="container mx-auto px-4 z-10 text-white">
        <div className="max-w-2xl">
          <h2 className="text-amber-400 font-serif text-xl mb-2">
            Bienvenidos, Semidioses
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
            Campamento mestizo
          </h1>
          <p className="text-lg md:text-xl mb-8">
            El único refugio seguro para los hijos de los dioses griegos.
             Entrena, aprende y descubre tus poderes divinos entre compañeros.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-md font-medium flex items-center transition-colors">
              Unete al campamento<ChevronRightIcon size={20} className="ml-2" />
            </button>
            <button className="border-2 border-white hover:bg-white/20 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Más información
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
