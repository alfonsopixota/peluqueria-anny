"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background with Gradient Backdrop */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background z-10" />
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop")',
                        filter: 'brightness(0.7)'
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4 block">
                        Peluquería de Autor en Jerez
                    </span>
                    <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight">
                        El arte de cuidar <br />
                        <span className="italic text-primary">tu esencia.</span>
                    </h1>
                    <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg font-light leading-relaxed">
                        Un espacio exclusivo donde la técnica y la pasión se unen para realzar tu belleza natural.
                        Déjate mimar por Anny del Agua.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#booking"
                            className="bg-primary hover:bg-gold-600 text-white px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 uppercase tracking-widest text-xs font-bold"
                        >
                            Reserva tu Experiencia
                        </a>
                        <a
                            href="#servicios"
                            className="border border-white/30 hover:bg-white/10 text-white px-10 py-4 rounded-full transition-all duration-300 uppercase tracking-widest text-xs font-bold"
                        >
                            Nuestros Servicios
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Decorative lines */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
                <div className="w-[1px] h-12 bg-primary/50 mb-2"></div>
                <span className="text-white/30 text-[10px] uppercase tracking-widest">Scroll</span>
            </div>
        </section>
    );
}
