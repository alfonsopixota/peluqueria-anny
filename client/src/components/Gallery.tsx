"use client";

import { motion } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop"
];

export default function Gallery() {
    return (
        <section id="galeria" className="py-24 bg-secondary/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Inspiración</h2>
                    <h3 className="text-4xl md:text-5xl font-serif">Nuestras Creaciones</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square overflow-hidden group rounded-sm"
                        >
                            <img
                                src={src}
                                alt={`Galería ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs uppercase tracking-widest font-bold border border-white/40 px-4 py-2">Ver Estilo</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
