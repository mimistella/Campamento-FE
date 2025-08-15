import React from 'react'
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  TreePineIcon,
  ShieldIcon,
} from 'lucide-react'
export function Location() {
  return (
    <section id="location" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-amber-800">
            Encuéntranos
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            El campamento está oculto a ojos mortales en Long Island, Nueva York.
            Solo aquellos con sangre divina o permiso especial pueden encontrar su
            camino a través de las barreras mágicas.ADVERTENCIA: No somos responsables de quienes intentan
            llegar inexitosamente.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-serif font-bold mb-4 text-amber-800">
              Detalles de la ubicación
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <MapPinIcon
                  className="text-amber-600 mr-3 mt-1 flex-shrink-0"
                  size={20}
                />
                <div>
                  <h4 className="font-bold">Address:</h4>
                  <p className="text-gray-700">
                    Farm Road 3.141, Long Island, New York
                  </p>
                  <p className="text-gray-500 italic text-sm">
                    (Visible solo para aquellos con visión divina o permiso)
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <PhoneIcon
                  className="text-amber-600 mr-3 mt-1 flex-shrink-0"
                  size={20}
                />
                <div>
                  <h4 className="font-bold">Contacto de emergencia:</h4>
                  <p className="text-gray-700">(800) SEMIDIOS</p>
                </div>
              </div>
              <div className="flex items-start">
                <MailIcon
                  className="text-amber-600 mr-3 mt-1 flex-shrink-0"
                  size={20}
                />
                <div>
                  <h4 className="font-bold">Envía un mensaje iris:</h4>
                  <p className="text-gray-700">
                    Quirón, Director de actividades del campamento.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Como contactarnos:</h4>
              <p className="text-gray-700">
                Si estás en apuros, nuestros satiros te encontrarán y guiaran al campamento.
                Si ya conoces tu padre divino, por favor rellena el formulario de registro
                lo más pronto posible, podrías estar en peligro de monstruos mientras lees esto.
                Si ya formas parte del campamento, inicia sesión y por favor, no nos llames.
              
              </p>
              <div className="flex space-x-4">
                <button
                  id="faq"
                  className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  FAQ
                </button>
                <button
                  id="prices"
                  className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Precios y tarifas
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden h-[400px] shadow-md bg-gradient-to-br from-amber-100 to-amber-200 flex flex-col items-center justify-center p-8">
            <TreePineIcon size={64} className="text-amber-700 mb-6" />
            <h3 className="text-2xl font-serif font-bold text-amber-800 text-center mb-4">
              Bosque del campamento mestizo,
            </h3>
            <p className="text-center text-amber-900">
              Nuestro bosque mágico es hogar de diversas criaturas míticas,
              campos de entrenamiento y el famoso campo de batalla de captura la bandera.
              Se encuentra protegido por magia antigua y custodiado por nuestra patrulla fronteriza.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
