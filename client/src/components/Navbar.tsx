"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-md py-4 shadow-sm"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-serif font-bold tracking-tighter text-primary">
                    EL FRASCO <span className="text-foreground font-light text-sm ml-1">DE ANNY</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest">
                    <Link href="#servicios" className="hover:text-primary transition-colors">Servicios</Link>
                    <Link href="#galeria" className="hover:text-primary transition-colors">Galería</Link>
                    <Link href="#testimonios" className="hover:text-primary transition-colors">Testimonios</Link>
                    <Link href="#nosotros" className="hover:text-primary transition-colors">Nosotros</Link>
                    <Link href="#contacto" className="hover:text-primary transition-colors">Contacto</Link>
                    <Link
                        href="#booking"
                        className="bg-primary text-white px-6 py-2 rounded-full hover:bg-gold-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/20"
                    >
                        Reservar Cita
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-background border-t border-border mt-4 p-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4">
                    <Link href="#servicios" onClick={() => setIsMobileMenuOpen(false)}>Servicios</Link>
                    <Link href="#galeria" onClick={() => setIsMobileMenuOpen(false)}>Galería</Link>
                    <Link href="#testimonios" onClick={() => setIsMobileMenuOpen(false)}>Testimonios</Link>
                    <Link href="#nosotros" onClick={() => setIsMobileMenuOpen(false)}>Nosotros</Link>
                    <Link
                        href="#booking"
                        className="bg-primary text-white px-6 py-3 rounded-md text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Reservar Cita
                    </Link>
                </div>
            )}
        </nav>
    );
}
