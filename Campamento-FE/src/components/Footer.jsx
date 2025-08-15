import React from 'react'
import { ShieldIcon } from 'lucide-react'
export function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ShieldIcon className="h-10 w-10 text-amber-500" />
              <h3 className="text-xl font-bold font-serif">Campamento Mestizo </h3>
            </div>
            <p className="mb-4">
              Un lugar casi libre de monstruos, desde tiempos antiguos.
            </p>
            <p className="text-sm text-amber-300">
              © {new Date().getFullYear()} Campamento mestizo. Plataforma libre de monstruos cortesía de la cabaña 9
            </p>
          </div>
          <div>
            <h4 className="text-lg font-serif font-bold mb-4 border-b border-amber-700 pb-2">
              Enlaces rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="hover:text-amber-300 transition-colors"
                >
                  Acerca del campamento
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="hover:text-amber-300 transition-colors"
                >
                  Ubicación
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-amber-300 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#prices"
                  className="hover:text-amber-300 transition-colors"
                >
                  Precios y tarifas
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-serif font-bold mb-4 border-b border-amber-700 pb-2">
              Advertencia divina
            </h4>
            <p className="text-sm">
              El campamento mestizo es exclusivo para semidioses. Los mortales sin  sangre divina no pueden localizar 
              ni entrar en nuestras instalaciones. Todas las actividades conllevan cierto riesgo de ataques de monstruos,
              interferencias divinas y contratiempos mitológicos. Aceptando los términos de uso, usted declara estar
               al tanto de los peligros a los que se somete.No se admiten reembolsos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}