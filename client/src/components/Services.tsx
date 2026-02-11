"use client";

import { motion } from "framer-motion";

const services = [
    {
        title: "Corte & Estilo",
        description: "Cortes personalizados que se adaptan a tus rasgos y estilo de vida.",
        price: "Desde 25€",
        image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Coloración Premium",
        description: "Balayage, babylights y técnicas avanzadas con productos orgánicos.",
        price: "Desde 45€",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Tratamientos SPA",
        description: "Hidratación profunda, reconstructores y rituales de bienestar capilar.",
        price: "Desde 30€",
        image: "https://images.unsplash.com/photo-1559599101-f2f63857d471?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Peinados Especiales",
        description: "Recogidos y estilismos para eventos, bodas y ocasiones únicas.",
        price: "Desde 35€",
        image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800&auto=format&fit=crop"
    }
];

export default function Services() {
    return (
        <section id="servicios" className="py-24 bg-secondary/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Nuestra Carta</h2>
                    <h3 className="text-4xl md:text-5xl font-serif">Servicios Exclusivos</h3>
                    <div className="w-20 h-[1px] bg-primary mx-auto mt-6"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden aspect-[3/4] mb-6 rounded-sm">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            </div>
                            <h4 className="text-xl font-serif mb-2 group-hover:text-primary transition-colors">{service.title}</h4>
                            <p className="text-muted text-sm mb-4 line-clamp-2">{service.description}</p>
                            <p className="text-primary font-bold text-lg">{service.price}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
