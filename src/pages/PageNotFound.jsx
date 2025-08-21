import React from 'react'
import {HeartCrackIcon} from 'lucide-react'

export default function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-amber-100">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
        <p>Lo sentimos, la pagina que buscas no existe o ha sido robada por los seguidores de Cronos</p>
        <HeartCrackIcon className="w-12 h-12 text-red-500 mb-4" />

        <a
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
            Volver al inicio
        </a>
        </div>
    )
    }
