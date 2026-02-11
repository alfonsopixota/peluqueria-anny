"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export default function Location() {
    return (
        <section id="contacto" className="py-24 bg-accent text-white">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Ubicación</h2>
                        <h3 className="text-4xl font-serif mb-8">Visita nuestro Santuario</h3>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                    <MapPin className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Dirección</h4>
                                    <p className="text-white/60 font-light">Calle Larga 45, Jerez de la Frontera, Cádiz</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                    <Clock className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Horario</h4>
                                    <p className="text-white/60 font-light">Lunes a Viernes: 10:00 - 20:00</p>
                                    <p className="text-white/60 font-light">Sábados: 09:00 - 14:00</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                    <Phone className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Teléfono</h4>
                                    <p className="text-white/60 font-light">+34 600 123 456</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Map Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10 relative p-2"
                    >
                        <div className="w-full h-full bg-zinc-800 rounded-xl relative overflow-hidden grayscale">
                            {/* This is a visual representation of a map */}
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="relative">
                                    <div className="w-8 h-8 bg-primary rounded-full animate-ping absolute inset-0"></div>
                                    <div className="w-8 h-8 bg-primary rounded-full relative z-10 flex items-center justify-center">
                                        <MapPin size={18} className="text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 bg-accent border border-white/20 p-4 rounded-lg shadow-2xl">
                                <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">El Frasco de Anny</p>
                                <p className="text-xs text-white/80">Jerez de la Frontera</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
