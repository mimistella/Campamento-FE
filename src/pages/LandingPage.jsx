import React,{ useEffect } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Location } from '../components/Location'
import { Footer } from '../components/Footer'
import { ScrollToTopButton } from '../components/ScrollToTopButton';

export function LandingPage() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Location />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}