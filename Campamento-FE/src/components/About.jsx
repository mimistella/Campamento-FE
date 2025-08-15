import React from 'react'
import { ShieldIcon, SwordIcon, BookOpenIcon, UsersIcon } from 'lucide-react'
export function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-amber-800">
            Acerca del Campamento:
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Fundado por los mismísimos dioses. El Campamento Mestizo es un lugar en donde los semidioses podrán
            aprender nuevas habilidades y prepararse para enfrentar los desafíos del mundo moderno. Además, hallaran
            la diversión y relajación perfectas para unas vacaciones de verano libre de monstruos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-amber-50 p-8 rounded-lg border border-amber-200">
            <h3 className="text-2xl font-serif font-bold mb-4 text-amber-800">
              Nuestra misión:
            </h3>
            <p className="text-gray-700 mb-4">
              Proveer un refugio seguro para los semidioses donde puedan aprender a
              aprovechar sus habilidades, entrenar para misiones, conocer nuevos aliados y prepararse para enfrentar las
              amenazas mitológicas que existen en el mundo moderno.
            </p>
            <p className="text-gray-700">
              Durante siglos, hemos servido como la principal instalación de entrenamiento para
              héroes griegos, ofreciendo protección contra monstruos y orientación de
              semidioses experimentados e instructores inmortales. Nuestra magia
              de fronteras, mantenida por el Vellocino de Oro, asegura que ninguna criatura
              no deseada o mortal pueda perturbar nuestro entrenamiento.
            </p>
          </div>
          <div className="bg-amber-50 p-8 rounded-lg border border-amber-200">
            <h3 className="text-2xl font-serif font-bold mb-4 text-amber-800">
              Actividades en nuestro campamento:
            </h3>
            <p className="text-gray-700 mb-4">
              Desde talleres de entrenamiento con espadas a carreras de carros,
              además de talleres como tiro con arco o griego antiguo, nuestros campistas
              experimentan una mezcla única de actividades tradicionales de campamento
              de verano y entrenamiento de semidioses.
            </p>
            <p className="text-gray-700">
              Nuestras actividades diarias incluyen captura la bandera en el bosque, canotaje en el lago,
              escalada en la pared de lava y entrenamiento especializado, basado en las habilidades de tu
              padre divino. Las fogatas nocturnas cuentan con canciones dirigidas por la cabaña de Apolo
              y aperitivos que prometemos, no atraerán a los monstruos.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg">
            <div className="mx-auto w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-4">
              <SwordIcon size={32} className="text-white" />
            </div>
            <h4 className="text-xl font-bold mb-2 font-serif text-amber-800">
              Entrenamiento de combate
            </h4>
            <p className="text-gray-700">
              Aprende a luchar con espadas, lanzas y otras habilidades de combate con nuestros
              entrenadores expertos.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg">
            <div className="mx-auto w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-4">
              <ShieldIcon size={32} className="text-white" />
            </div>
            <h4 className="text-xl font-bold mb-2 font-serif text-amber-800">
              Sistema de cabañas:
            </h4>
            <p className="text-gray-700">
              Vive con tus hermanos, en cabañas dedicadas a tu padre
              divino.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg">
            <div className="mx-auto w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-4">
              <BookOpenIcon size={32} className="text-white" />
            </div>
            <h4 className="text-xl font-bold mb-2 font-serif text-amber-800">
              Estudios Antiguos:
            </h4>
            <p className="text-gray-700">
              Aprende griego antiguo, mitología e historia con los mejores instructores de la zona.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg">
            <div className="mx-auto w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-4">
              <UsersIcon size={32} className="text-white" />
            </div>
            <h4 className="text-xl font-bold mb-2 font-serif text-amber-800">
              Misiones
            </h4>
            <p className="text-gray-700">
              Participa en misiones para salvar el mundo y demostrar tus habilidades heroicas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}