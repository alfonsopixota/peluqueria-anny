"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="nosotros" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=800&auto=format&fit=crop"
                                alt="Anny del Agua"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10"></div>
                        <div className="absolute -top-6 -left-6 border-l-2 border-t-2 border-primary w-24 h-24 -z-10"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4">La Esencia</h2>
                        <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Anny del Agua <br /><span className="text-primary italic">Estilo con Alma</span></h3>

                        <div className="space-y-6 text-muted leading-relaxed font-light">
                            <p>
                                Con más de 15 años de experiencia en el sector de la peluquería de alta gama,
                                Anny del Agua fundó **El Frasco** como un refugio para quienes buscan no solo un cambio de imagen,
                                sino una experiencia de bienestar integral.
                            </p>
                            <p>
                                Nuestra filosofía se basa en la personalización absoluta. No creemos en tendencias genéricas,
                                sino en potenciar la identidad única de cada persona que cruza nuestra puerta.
                                Utilizamos exclusivamente productos orgánicos y técnicas de vanguardia que respetan la salud de tu cabello.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-3xl font-serif text-primary">15+</p>
                                <p className="text-xs uppercase tracking-widest text-muted">Años de Arte</p>
                            </div>
                            <div>
                                <p className="text-3xl font-serif text-primary">5k+</p>
                                <p className="text-xs uppercase tracking-widest text-muted">Clientes Felices</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
