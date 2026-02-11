"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { LogOut, Calendar, Phone, Mail, User, CheckCircle, XCircle, Clock } from "lucide-react";

export default function AdminPage() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [password, setPassword] = useState("");
    const [appointments, setAppointments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "anny2024") {
            setIsAuthorized(true);
            fetchAppointments();
        } else {
            alert("Contraseña incorrecta");
        }
    };

    const fetchAppointments = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, {
                headers: { "Authorization": password }
            });
            if (res.ok) {
                const data = await res.json();
                setAppointments(data);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": password
                },
                body: JSON.stringify({ estado: status })
            });
            if (res.ok) {
                fetchAppointments();
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-6">
                <div className="max-w-md w-full bg-secondary/30 p-8 rounded-2xl border border-border shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif text-primary mb-2">Panel de Control</h1>
                        <p className="text-muted text-sm">Ingrese su clave de acceso</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full bg-background border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="w-full bg-primary text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold-600 transition-all">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar / Header */}
            <header className="bg-accent text-white py-6 border-b border-white/10">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <h1 className="text-xl font-serif font-bold tracking-tighter text-primary">
                        EL FRASCO <span className="text-white font-light text-xs ml-1 font-sans uppercase tracking-[0.2em]">Dashboard</span>
                    </h1>
                    <button
                        onClick={() => setIsAuthorized(false)}
                        className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-primary transition-colors"
                    >
                        <LogOut size={16} /> Salir
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-serif mb-2">Gestión de Citas</h2>
                        <p className="text-muted">Revisa y gestiona las reservas de tus clientes.</p>
                    </div>
                    <button
                        onClick={fetchAppointments}
                        className="p-3 bg-secondary/50 rounded-full hover:bg-white transition-all border border-border"
                    >
                        <Clock size={20} className="text-primary" />
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-dashed border-border">
                        <p className="text-muted italic">No hay citas registradas todavía.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {appointments.map((apt) => (
                            <div key={apt._id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-border flex flex-col md:row items-center justify-between gap-6 hover:shadow-md transition-all">
                                <div className="flex flex-col md:row items-center gap-6 flex-1">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                                        {apt.nombreCliente[0]}
                                    </div>
                                    <div className="space-y-1 text-center md:text-left">
                                        <h3 className="text-xl font-bold">{apt.nombreCliente}</h3>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted">
                                            <span className="flex items-center gap-1"><Mail size={14} /> {apt.emailCliente}</span>
                                            <span className="flex items-center gap-1"><Phone size={14} /> {apt.telefonoCliente}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-full w-[1px] bg-border hidden md:block" />

                                <div className="flex flex-col items-center md:items-start gap-2">
                                    <p className="text-xs uppercase tracking-widest text-primary font-bold">{apt.servicio}</p>
                                    <div className="flex items-center gap-2 text-lg font-serif">
                                        <Calendar size={18} className="text-muted" />
                                        <span>{format(new Date(apt.fecha), "d 'de' MMMM", { locale: es })}</span>
                                        <span className="text-primary font-bold">@ {apt.hora}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {apt.estado === "pendiente" ? (
                                        <>
                                            <button
                                                onClick={() => updateStatus(apt._id, "confirmada")}
                                                className="flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-green-600 hover:text-white transition-all"
                                            >
                                                <CheckCircle size={14} /> Confirmar
                                            </button>
                                            <button
                                                onClick={() => updateStatus(apt._id, "cancelada")}
                                                className="flex items-center gap-2 bg-red-500/10 text-red-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                <XCircle size={14} /> Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${apt.estado === 'confirmada' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                            }`}>
                                            {apt.estado}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
