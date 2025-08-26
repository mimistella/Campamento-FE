import { Link } from "react-router-dom";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ForgotPasswordForm } from '../forms/ForgotPasswordForm';
import { ScrollToTopButton } from '../components/ScrollToTopButton';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 flex flex-col">
      <Header />
  <main className="flex flex-col items-center justify-center flex-1 pt-24">
        <ForgotPasswordForm />
        <div className="flex flex-col items-center mt-6 w-full max-w-sm mb-8">
          <Link
            to="/login"
            className="inline-block px-4 py-2 rounded-md bg-amber-100 text-amber-800 font-serif font-semibold shadow hover:bg-amber-200 transition-colors text-base"
          >
            ← Volver a iniciar sesión
          </Link>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
