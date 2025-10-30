import { toast } from "react-hot-toast";

/**
 * Custom hook para manejar toasts estilizados con `react-hot-toast`.
 * 
 * Proporciona métodos para mostrar mensajes de éxito, error, información, carga y promesas.
 * Todos los toasts comparten un estilo base coherente.
 *
 * @example
 * const { success, error, info, loading, dismiss, promise } = useToaster();
 * success("Operación completada correctamente!");
 */
export const useToaster = () => {

  /** @type {React.CSSProperties} */
  const baseStyle = {
    border: "1px solid #ddd",
    padding: "16px",
    fontWeight: 500,
    fontSize: "0.95rem",
    borderRadius: "10px",
  };

  /**
   * Muestra un toast de éxito.
   * @param {string} msg - Mensaje a mostrar en el toast.
   */
  const success = (msg) =>
    toast.success(msg, {
      style: {
        ...baseStyle,
        border: "1px solid #16a34a",
        color: "#14532d",
        background: "#dcfce7",
      },
      iconTheme: {
        primary: "#16a34a",
        secondary: "#f0fdf4",
      },
    });

  /**
   * Muestra un toast de error.
   * @param {string} msg - Mensaje de error a mostrar.
   */
  const error = (msg) =>
    toast.error(msg, {
      style: {
        ...baseStyle,
        border: "1px solid #dc2626",
        color: "#7f1d1d",
        background: "#fee2e2",
      },
      iconTheme: {
        primary: "#dc2626",
        secondary: "#fef2f2",
      },
    });

  /**
   * Muestra un toast informativo (sin ícono especial).
   * @param {string} msg - Texto del mensaje informativo.
   */
  const info = (msg) =>
    toast(msg, {
      style: {
        ...baseStyle,
        border: "1px solid #2563eb",
        color: "#1e3a8a",
        background: "#dbeafe",
      },
      iconTheme: {
        primary: "#2563eb",
        secondary: "#eff6ff",
      },
    });

  /**
   * Muestra un toast con estado de carga (spinner).
   * @param {string} msg - Mensaje mientras se realiza una acción asíncrona.
   * @returns {string} id - Identificador del toast (para cerrarlo manualmente).
   */
  const loading = (msg) =>
    toast.loading(msg, {
      style: {
        ...baseStyle,
        border: "1px solid #facc15",
        color: "#713f12",
        background: "#fef9c3",
      },
      iconTheme: {
        primary: "#facc15",
        secondary: "#fefce8",
      },
    });

  /**
   * Cierra un toast activo usando su ID.
   * @param {string} id - ID del toast retornado por `loading()`.
   */
  const dismiss = (id) => toast.dismiss(id);

  /**
   * Muestra un conjunto de toasts para una promesa asíncrona:
   * - loading: mientras se ejecuta.
   * - success: si se resuelve correctamente.
   * - error: si falla.
   *
   * @template T
   * @param {() => Promise<T>} promiseFunc - Función que retorna una promesa a ejecutar.
   * @param {{ loadingMsg: string, successMsg: string, errorMsg: string }} messages - Mensajes a mostrar en cada estado.
   * @returns {Promise<T>} Resultado de la promesa original.
   *
   * @example
   * await promise(() => fetchData(), {
   *   loadingMsg: "Cargando datos...",
   *   successMsg: "Datos cargados correctamente!",
   *   errorMsg: "Error al cargar datos."
   * });
   */
  const promise = async (promiseFunc, { loadingMsg, successMsg, errorMsg }) => {
    const id = toast.loading(loadingMsg);
    try {
      const result = await promiseFunc();
      toast.success(successMsg, { id });
      return result;
    } catch (err) {
      toast.error(errorMsg, { id });
      throw err;
    }
  };

  return { success, error, info, loading, dismiss, promise };
};
