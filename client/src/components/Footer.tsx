"use client";

import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-accent text-white py-20">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2">
                        <h2 className="text-2xl font-serif font-bold tracking-tighter text-primary mb-6">
                            EL FRASCO <span className="text-white font-light text-sm ml-1">DE ANNY</span>
                        </h2>
                        <p className="text-white/60 max-w-sm font-light leading-relaxed">
                            Un santuario de belleza y cuidado personal en el corazón de Jerez.
                            Especialistas en coloración de autor y tratamientos capilares de alta gama.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-primary uppercase tracking-widest text-xs font-bold mb-6">Contacto</h4>
                        <ul className="space-y-4 text-white/70 text-sm">
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="text-primary" />
                                Calle Larga 45, Jerez de la Frontera
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-primary" />
                                +34 600 123 456
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-primary" />
                                hola@elfrancodeanny.com
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-primary uppercase tracking-widest text-xs font-bold mb-6">Síguenos</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:row justify-between items-center text-white/30 text-[10px] uppercase tracking-[0.2em]">
                    <p>© 2024 El Frasco de Anny. Todos los derechos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacidad</a>
                        <a href="#" className="hover:text-white">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
