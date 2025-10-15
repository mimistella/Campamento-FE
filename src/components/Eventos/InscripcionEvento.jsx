import { GetLoggedUser } from '../utilities/GetLoggedUser.js';
import { useEventos } from '../../hooks/useEventos.js';
import { useState, useEffect } from 'react';

export default function InscribirAEvento({ evento }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { createSolicitud } = useEventos();

  // ✅ Cargar usuario correctamente
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log('loading user')
        const userData = await GetLoggedUser();
        setUser(userData);
        console.log('loaded user')
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };
    
    loadUser();
  }, []);

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