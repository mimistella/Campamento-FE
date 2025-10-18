
/**
 * Maneja los errores que vienen del backend o de Axios de forma genérica.
 * @param {Error} error - El error capturado (AxiosError o Error genérico)
 * @param {string} context - Mensaje contextual opcional ("Creando evento", "Actualizando misión", etc.)
 */
export function handleApiError(error, context = "Operación") {
  console.error(`${context} - Error completo:`, error);

  // Caso: respuesta del servidor (error HTTP)
  if (error.response) {
    const { status, data } = error.response;

    let backendMessage = ""
        // Mensaje base del backend
    // backendMessage =
    //   data?.message || data?.error || "Error desconocido en el servidor";
    if(data.details ){
        data.details.map(err => (backendMessage + " falla en " + err.path[0] + " " + err.message))
        console.log("detailsss")
        console.log(backendMessage)
        console.log(data.details)
    }


    // 🧠 Personalizar según tipo de error
    switch (status) {
      case 400:
        return(`⚠️ ${context} falló: ${backendMessage}`);

      case 401:
        return("🔒 No estás autorizado. Inicia sesión nuevamente.");

      case 403:
        return("🚫 No tenés permisos para esta acción.");

      case 404:
        return("❓ Recurso no encontrado.");
      case 500:
        return("💥 Error interno del servidor. Intenta más tarde.");

      default:
        return(`⚠️ Error inesperado: ${backendMessage}`);
    }
  }

  // Caso: no hay respuesta del servidor
  else if (error.request) {
    return("🌐 No se recibió respuesta del servidor.");
  }

  // Caso: error al crear la solicitud (frontend)
  else {
    return(`⚠️ ${context} falló: ${error.message}`);
  }
}
