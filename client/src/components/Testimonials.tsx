"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Clara Rodríguez",
        text: "La mejor experiencia de peluquería en Jerez. Anny entiende perfectamente lo que mi cabello necesita y los productos de Secretos del Agua son mágicos.",
        role: "Cliente desde 2021"
    },
    {
        name: "Sofía Martínez",
        text: "Un lugar para desconectar. El trato es impecable y la técnica de coloración es simplemente superior. Salgo renovada cada vez.",
        role: "Modelo"
    },
    {
        name: "Elena Vera",
        text: "Buscaba algo natural y respetuoso con el medio ambiente. El Frasco de Anny es el refugio perfecto para quienes valoramos la calidad orgánica.",
        role: "Empresaria"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Experiencias</h2>
                    <h3 className="text-4xl font-serif italic text-accent">Lo que dicen de nosotros</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <Quote className="text-primary" size={24} />
                            </div>
                            <p className="text-muted text-lg mb-8 italic leading-relaxed">
                                "{t.text}"
                            </p>
                            <div>
                                <h4 className="font-bold text-accent uppercase tracking-widest text-xs mb-1">{t.name}</h4>
                                <p className="text-primary/60 text-[10px] uppercase font-bold tracking-tighter">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
