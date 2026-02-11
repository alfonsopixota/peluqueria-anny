import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import BookingSystem from "@/components/BookingSystem";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />

      <section className="py-24 bg-accent text-white overflow-hidden relative border-t border-white/5 border-b border-white/5">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto font-light italic">
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-relaxed">
              "La peluquería no es solo cortar el cabello, es descubrir la confianza que cada persona lleva dentro."
            </h2>
            <div className="w-12 h-[1px] bg-primary mx-auto mb-4 opacity-50"></div>
            <p className="text-primary tracking-[0.3em] uppercase text-xs font-bold">Anny del Agua</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </section>

      <BookingSystem />
      <Location />
      <Footer />
    </main>
  );
}
