import { GetLoggedUser } from '../utilities/GetLoggedUser.js';
import { useEventos } from '../../hooks/useEventos.js';
import { useState, useContext } from 'react';
import {AuthContext} from '@context/AuthContext';

export default function InscribirAEvento({ evento }) {

  const [loading, setLoading] = useState(false);
  const { createSolicitud } = useEventos();
  const {user} = useContext(AuthContext);


  // ✅ Función async con manejo correcto
  const handleInscribir = async () => {
    if (!user) {
      alert("Usuario no cargado");
      return;
    }

    setLoading(true);

    try {
      // Ya tienes el evento como prop, no necesitas fetchearlo
      await createSolicitud({
        campista: user.id, // O user.data.id, dependiendo de tu estructura
        evento: evento.id,
        estado: "pendiente"
      });

      alert(`Inscripto en ${evento.titulo}`);
    } catch (error) {
      console.error("Error al inscribir:", error);
      alert(`Error al inscribir: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mostrar loading mientras carga el usuario
  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <button
      className="flex mx-auto mt-4 bg-green-800 bg-opacity-20 hover:bg-green-950/50 font-bold py-2 px-4 rounded disabled:opacity-50"
      onClick={handleInscribir} // ✅ Sin paréntesis
      disabled={loading}
    >
      {loading ? "Inscribiendo..." : "Inscribirse"}
    </button>
  );
}