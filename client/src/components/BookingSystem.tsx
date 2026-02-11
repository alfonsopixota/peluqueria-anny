"use client";

import { useState, useEffect } from "react";
import { format, addDays, startOfToday, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
    { id: 1, name: "Corte & Estilo", price: 25, duration: "45 min" },
    { id: 2, name: "Coloración Premium", price: 45, duration: "90 min" },
    { id: 3, name: "Tratamientos SPA", price: 30, duration: "60 min" },
    { id: 4, name: "Peinados Especiales", price: 35, duration: "60 min" }
];

const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00", "19:00"
];

export default function BookingSystem() {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState(startOfToday());
    const [selectedTime, setSelectedTime] = useState("");
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: ""
    });

    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

    const days = eachDayOfInterval({
        start: currentMonth,
        end: endOfMonth(currentMonth)
    });

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    useEffect(() => {
        const fetchSlots = async () => {
            setIsLoadingSlots(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/available-slots?fecha=${selectedDate.toISOString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setAvailableSlots(data);
                }
            } catch (error) {
                console.error("Error fetching slots:", error);
            } finally {
                setIsLoadingSlots(false);
            }
        };
        fetchSlots();
    }, [selectedDate]);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Enviar a la API
        const appointmentData = {
            nombreCliente: formData.nombre,
            emailCliente: formData.email,
            telefonoCliente: formData.telefono,
            servicio: selectedService.name,
            precio: selectedService.price,
            fecha: selectedDate,
            hora: selectedTime,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData)
            });
            if (res.ok) {
                alert("¡Cita reservada con éxito! Revisa tu email.");
                setStep(1);
                // Reset state
            }
        } catch (error) {
            console.error("Error booking:", error);
        }
    };

    return (
        <section id="booking" className="py-24 bg-background">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Reserva Online</h2>
                    <h3 className="text-4xl font-serif">Tu Momento es Ahora</h3>
                </div>

                <div className="bg-secondary/50 rounded-2xl p-8 md:p-12 shadow-xl border border-border overflow-hidden">
                    {/* Progress Bar */}
                    <div className="flex justify-between mb-12 relative">
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2 z-0" />
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-500 ${step >= i ? "bg-primary text-white" : "bg-background text-muted border border-border"
                                    }`}
                            >
                                {i === 1 && <CalendarIcon size={18} />}
                                {i === 2 && <Clock size={18} />}
                                {i === 3 && <User size={18} />}
                                {i === 4 && <CreditCard size={18} />}
                            </div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h4 className="text-xl font-serif mb-6 text-center">Selecciona un Servicio</h4>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {services.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => { setSelectedService(s); handleNext(); }}
                                            className={`p-6 rounded-xl border text-left transition-all hover:border-primary hover:shadow-lg ${selectedService?.id === s.id ? "border-primary bg-primary/5 shadow-md" : "border-border bg-background"
                                                }`}
                                        >
                                            <p className="font-bold text-lg mb-1">{s.name}</p>
                                            <p className="text-muted text-sm mb-3">{s.duration}</p>
                                            <p className="text-primary font-bold">{s.price}€</p>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div className="grid md:grid-cols-2 gap-12">
                                    {/* Calendar */}
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="font-serif capitalize">
                                                {format(currentMonth, 'MMMM yyyy', { locale: es })}
                                            </h4>
                                            <div className="flex gap-2">
                                                <button onClick={prevMonth} className="p-2 hover:bg-white rounded-full"><ChevronLeft size={20} /></button>
                                                <button onClick={nextMonth} className="p-2 hover:bg-white rounded-full"><ChevronRight size={20} /></button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-muted mb-4 uppercase tracking-tighter">
                                            {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map(d => <div key={d}>{d}</div>)}
                                        </div>
                                        <div className="grid grid-cols-7 gap-2">
                                            {days.map((day, i) => {
                                                const isSelected = isSameDay(day, selectedDate);
                                                const isPast = day < startOfToday();
                                                return (
                                                    <button
                                                        key={i}
                                                        disabled={isPast}
                                                        onClick={() => setSelectedDate(day)}
                                                        className={`aspect-square rounded-full flex items-center justify-center text-sm transition-all ${isSelected ? "bg-primary text-white scale-110 shadow-lg" :
                                                            isPast ? "text-muted/30 cursor-not-allowed" : "hover:bg-primary/20"
                                                            }`}
                                                    >
                                                        {format(day, 'd')}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Time Slots */}
                                    <div>
                                        <h4 className="font-serif mb-6">Hora Disponible</h4>
                                        {isLoadingSlots ? (
                                            <div className="flex justify-center py-12">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                            </div>
                                        ) : availableSlots.length > 0 ? (
                                            <div className="grid grid-cols-3 gap-3">
                                                {availableSlots.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-3 rounded-lg border text-sm transition-all ${selectedTime === time ? "bg-primary text-white border-primary shadow-md" : "bg-background border-border hover:border-primary/50"
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-center py-12 text-muted text-sm italic">No hay horas disponibles para este día.</p>
                                        )}
                                        <button
                                            disabled={!selectedTime}
                                            onClick={handleNext}
                                            className="w-full mt-10 bg-primary text-white py-4 rounded-full disabled:opacity-50 uppercase tracking-widest text-xs font-bold"
                                        >
                                            Continuar
                                        </button>
                                        <button onClick={handleBack} className="w-full mt-4 text-muted text-sm">Atrás</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-md mx-auto"
                            >
                                <h4 className="text-xl font-serif mb-8 text-center">Tus Datos</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-muted block mb-2">Nombre Completo</label>
                                        <input
                                            type="text"
                                            className="w-full bg-background border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="Ej. María García"
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-muted block mb-2">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            className="w-full bg-background border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="maria@ejemplo.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-muted block mb-2">Teléfono</label>
                                        <input
                                            type="tel"
                                            className="w-full bg-background border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="600 000 000"
                                            value={formData.telefono}
                                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        disabled={!formData.nombre || !formData.email || !formData.telefono}
                                        onClick={handleNext}
                                        className="w-full mt-6 bg-primary text-white py-4 rounded-full disabled:opacity-50 uppercase tracking-widest text-xs font-bold"
                                    >
                                        Confirmar Datos
                                    </button>
                                    <button onClick={handleBack} className="w-full mt-4 text-muted text-sm">Atrás</button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-center"
                            >
                                <div className="mb-8 p-6 bg-white rounded-2xl border border-primary/20">
                                    <h4 className="font-serif text-2xl mb-4 text-primary">Resumen de tu Cita</h4>
                                    <div className="space-y-2 text-left max-w-xs mx-auto">
                                        <p className="flex justify-between"><span>Servicio:</span> <strong>{selectedService.name}</strong></p>
                                        <p className="flex justify-between"><span>Fecha:</span> <strong>{format(selectedDate, 'PPP', { locale: es })}</strong></p>
                                        <p className="flex justify-between"><span>Hora:</span> <strong>{selectedTime}</strong></p>
                                        <div className="border-t border-border mt-4 pt-4 flex justify-between text-xl">
                                            <span>Total:</span> <strong className="text-primary">{selectedService.price}€</strong>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-muted mb-8 italic">
                                    * El pago se realizará en el establecimiento tras el servicio.
                                </p>

                                <button
                                    onClick={handleSubmit}
                                    className="bg-primary text-white px-12 py-4 rounded-full shadow-xl hover:bg-gold-600 transition-all uppercase tracking-widest text-sm font-bold"
                                >
                                    Finalizar Reserva
                                </button>
                                <button onClick={handleBack} className="w-full mt-6 text-muted text-sm">Atrás</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
