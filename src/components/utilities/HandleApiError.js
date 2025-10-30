/**
 * Maneja los errores que vienen del backend de forma genérica.
 * 
 * @param {Error} error - El error capturado 
 * @param {string} context - Mensaje contextual opcional ("Creando evento", "Actualizando misión", etc.)
 * @returns {{string, Object}}  Mensaje de error procesado y objeto con errores de formulario
 */
export function handleApiError(error, context = "Operación") {
  console.error(`${context} - Error completo:`, error);
  let errorMessage;

  // Caso: respuesta del servidor (error HTTP)
  if (error.response) {
    const { status, data } = error.response;
    let fieldErrors = {};

    // Caso : Errores de formulario
    if (data?.details && Array.isArray(data.details)) {
      data.details.forEach((d) => {
        const field = d.path?.[0];
        if (field) fieldErrors[field] = traducir(d.message);
      });
      
    }

    const backendMessage =
      data?.message || data?.error || "Error desconocido en el servidor";

    // 🧠 Personalizar según tipo de error
    switch (status) {
      case 400:
        errorMessage = `⚠️ ${context} falló: revise los datos ingresados`;
        break;
      case 401:
        errorMessage = "🔒 No estás autorizado. Inicia sesión nuevamente.";
        break;
      case 403:
        errorMessage = "🚫 No tenés permisos para esta acción.";
        break;
      case 404:
        errorMessage = "❓ Recurso no encontrado.";
        break;
      case 500:
        errorMessage = "💥 Error interno del servidor. Intenta más tarde.";
        break;
      default:
        errorMessage = `⚠️ Error inesperado: ${backendMessage}`;
        break;
    }

    return {errorMessage, fieldErrors};
  }

  // Caso: no hay respuesta del servidor
  else if (error.request) {
    return {errorMessage:"No se recibió respuesta del servidor."};
  }

  // Caso: error al crear la solicitud (frontend)
  else {
    return {errorMessage:`⚠️ ${context} falló: ${error.message}`};
  }
}

const traducir = (msg) => {
  return msg
    .replace("String must contain at least", "Debe tener al menos")
    .replace("character(s)", "caracteres")
    .replace("Number must be greater than or equal to", "Debe ser mayor o igual a")
    .replace("Number must be less than or equal to", "Debe ser menor o igual a")
    .replace("Required", "Campo obligatorio")
    .replace("Invalid date", "Fecha inválida")
    .replace("Expected number, received string", "Se esperaba un número")
    .replace("Expected string, received number", "Se esperaba un texto");
};