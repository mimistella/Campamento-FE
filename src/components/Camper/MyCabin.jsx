import { useState } from "react";
import { useCabaniaCampista } from "@hooks/useCabaniaCampista";
import CabinInfo from "./CabinInfo";
import { useAuth } from "@hooks/useAuth";
import { useToaster } from "@hooks/useToaster";
import ButtonBase from "@components/commonComp/ButtonBase";

export default function MyCabin() {
  const {
    hospedaje,
    cabaniaDetalle,
    loading,
    error,
    periodo,
    hasHospedajeActivo,
    deidades,
    crearHospedaje,
    refetch
  } = useCabaniaCampista();

  const { user } = useAuth();
  const toast = useToaster();

  const [seleccion, setSeleccion] = useState("");
  const [creando, setCreando] = useState(false);

  async function handleCrearHospedaje() {
    if (!seleccion) {
      toast.error("Debes seleccionar una deidad antes de continuar.");
      return;
    }

    if (!user?.id || !periodo) {
      toast.error("No se puede crear hospedaje: datos incompletos.");
      return;
    }

    setCreando(true);
    const loadingToastId = toast.loading("Creando hospedaje...");

    try {
      await crearHospedaje(seleccion);
      toast.dismiss(loadingToastId);
      toast.success("Hospedaje creado correctamente.");
      refetch();
      setSeleccion(""); 
    } catch (err) {
      toast.dismiss(loadingToastId);
      toast.error("Error al crear hospedaje. Intente nuevamente.");
    } finally {
      setCreando(false);
    }
  }

  if (loading)
    return (
      <div className="p-8 text-center text-gray-600">
        Cargando información...
      </div>
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

  if (hasHospedajeActivo && hospedaje && cabaniaDetalle) {
    return (
      <div className="bg-amber-50 flex justify-center items-start lg:items-center min-h-screen">
        <CabinInfo cabin={cabaniaDetalle} />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-amber-600 mb-4">
          ¿Quién es tu padre divino?
        </h1>

        <select
          className="border rounded-lg w-full p-2 text-gray-700"
          value={seleccion}
          onChange={(e) => setSeleccion(e.target.value)}
          disabled={creando}
        >
          <option value="">Seleccioná una deidad</option>
          {deidades?.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nombre}
            </option>
          ))}
        </select>

        <ButtonBase
          className="mt-4 w-full"
          variant="contained"
          color="amber"
          disabled={creando}
          onClick={handleCrearHospedaje}
        >
          {creando ? "Creando..." : "Aceptar"}
        </ButtonBase>
      </div>
    </div>
  );
}