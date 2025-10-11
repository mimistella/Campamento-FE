import { useState, useEffect } from "react";
import { useCabaniaCampista } from "@hooks/useCabaniaCampista";
import CabinInfo from "./CabinInfo";
import api from "@hooks/useApi";
import { useAuth } from "@hooks/useAuth";

export default function MyCabin() {
  const {
    hospedaje,
    loading,
    error,
    periodo,
    hasHospedajeActivo,
    deidades,
    refetch,
  } = useCabaniaCampista();

  const { user } = useAuth();
  const [seleccion, setSeleccion] = useState("");
  const [creando, setCreando] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [mockCabin, setMockCabin] = useState(null);

  useEffect(() => {
    if (hospedaje?.cabania?.id) {
      api
        .get(`/cabanias/myCabin/${hospedaje.cabania.id}`)
        .then((res) => setMockCabin(res.data.data))
        .catch((err) => console.error("Error al obtener mock:", err));
    }
  }, [hospedaje]);

  async function handleSeleccionDeidad(e) {
    const deidadId = e.target.value;
    setSeleccion(deidadId);
    if (!deidadId || creando) return;

    if (!user?.id || !periodo) {
      setFeedback("No se puede crear hospedaje: datos incompletos.");
      return;
    }

    try {
      setCreando(true);
      setFeedback("Creando hospedaje, por favor espere...");

      const cabRes = await api.get(`/cabanias/deidad/${deidadId}`);
      const cabania = cabRes.data.data;
      if (!cabania) throw new Error("No se encontró cabaña para esa deidad");

      await api.post("/hospedaje", {
        campista: user.id,
        cabania: cabania.id,
        fechaInicio: periodo.fechaInicioPer,
        fechaFin: periodo.fechaFinPer,
      });

      setFeedback("Hospedaje creado correctamente ");
      await refetch();
    } catch (err) {
      console.error(err);
      setFeedback("Error al crear hospedaje. Intente nuevamente.");
    } finally {
      setCreando(false);
    }
  }

  if (loading)
    return (
      <div className="p-8 text-center text-gray-600">Cargando información...</div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-600">Error: {error}</div>
    );

  if (!periodo)
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-amber-600 mb-4">
            No estás inscripto a ningún período
          </h1>
          <p className="text-gray-600">
            Debes inscribirte a un período para acceder a esta sección.
          </p>
        </div>
      </div>
    );


  if (hasHospedajeActivo && hospedaje && mockCabin) {
    return (
      <div className="bg-amber-50 flex justify-center items-start lg:items-center min-h-screen">
        <CabinInfo cabin={mockCabin} />
      </div>
    );
  }

  // Formulario para elegir deidad
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-amber-600 mb-4">
          ¿Quién es tu padre divino?
        </h1>

        <select
          className="border rounded-lg w-full p-2 text-gray-700"
          value={seleccion}
          onChange={handleSeleccionDeidad}
          disabled={creando}
        >
          <option value="">Seleccioná una deidad</option>
          {deidades?.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nombre}
            </option>
          ))}
        </select>

        {creando && (
          <div className="mt-4 flex justify-center">
            <span className="animate-pulse text-amber-600">Creando...</span>
          </div>
        )}
        {feedback && (
          <p className="mt-4 text-gray-600 italic">{feedback}</p>
        )}
      </div>
    </div>
  );
}