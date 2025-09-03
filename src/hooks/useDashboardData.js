import { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTES } from "../constants/apiroutes";

export function useDashboardData() {
  const [diasCampamento, setDiasCampamento] = useState(null);
  const [inscriptos, setInscriptos] = useState(null);
  const [instructores, setInstructores] = useState(null);
  const [cabanias, setCabanias] = useState(null);


  useEffect(() => {
    const proximaFecha = new Date("2025-12-20T00:00:00");
    if (!isNaN(proximaFecha)) {
      const hoy = new Date();
      const diferencia = Math.ceil(
        (proximaFecha - hoy) / (1000 * 60 * 60 * 24)
      );
      setDiasCampamento(diferencia);
    } else {
      setDiasCampamento(0);
    }
  }, []);

  
  useEffect(() => {
    axios
      .get(API_ROUTES.CAMPERS)
      .then((res) =>
        setInscriptos(Array.isArray(res.data.data) ? res.data.data.length : 0)
      )
      .catch(() => setInscriptos(0));

    axios
      .get(API_ROUTES.INSTRUCTORS)
      .then((res) =>
        setInstructores(
          Array.isArray(res.data.data) ? res.data.data.length : 0
        )
      )
      .catch(() => setInstructores(0));

    axios
      .get(API_ROUTES.CABANAS)
      .then((res) =>
        setCabanias(Array.isArray(res.data.data) ? res.data.data.length : 0)
      )
      .catch(() => setCabanias(0));
  }, []);

  return { diasCampamento, inscriptos, instructores, cabanias };
}