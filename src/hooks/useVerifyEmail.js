import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function useVerifyEmail(token) {
  const [status, setStatus] = useState("verifying"); 
  const [message, setMessage] = useState("Verificando tu correo...");
  const executedRef = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (executedRef.current) return;
      executedRef.current = true;

      if (!token) {
        setStatus("error");
        setMessage("Token inválido o inexistente");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/api/auth/verify-email/${token}`);
        setStatus("success");
        setMessage(res.data.message || "¡Correo verificado con éxito!");
      } catch (err) {
        console.error("Error al verificar:", err);
        setStatus("error");
        setMessage("Error al verificar el correo");
      }
    };

    verifyEmail();
  }, [token]);

  return { status, message };
}
