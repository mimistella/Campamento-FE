import { useEffect } from "react";
import { CheckCircleIcon, XCircleIcon, Loader2Icon } from "lucide-react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import useVerifyEmail from "../hooks/useVerifyEmail";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { status, message } = useVerifyEmail(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => navigate("/login"), 15000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center border border-gray-200">
        {status === "verifying" && (
          <>
            <Loader2Icon className="mx-auto h-12 w-12 text-amber-600 animate-spin mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verificando correo...</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircleIcon className="mx-auto h-12 w-12 text-amber-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">¡Verificación exitosa!</h2>
            <p className="text-gray-600">{message}</p>
            <p className="text-sm text-gray-500 mt-2">
              Serás redirigido al login en 15 segundos...
            </p>
            <Link
              to="/login"
              className="inline-block mt-4 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Ir al login ahora
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <XCircleIcon className="mx-auto h-12 w-12 text-orange-900 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error de verificación</h2>
            <p className="text-gray-600">{message}</p>
            <Link
              to="/signup"
              className="inline-block mt-4 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Intentar de nuevo
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;