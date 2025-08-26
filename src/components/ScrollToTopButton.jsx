import { useEffect, useState } from 'react';

export function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 80);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-4 right-4 z-[100] bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg p-4 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-400"
      style={{ touchAction: 'manipulation' }}
      aria-label="Volver arriba"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
