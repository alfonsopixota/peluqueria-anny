"use client";

import { useState, useEffect } from "react";
import { startOfToday, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";
import { Calendar as CalendarIcon, Clock, User, CreditCard, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "sonner";

import PaymentForm from "./PaymentForm";
import ServiceSelection from "./booking/ServiceSelection";
import DateSelection from "./booking/DateSelection";
import UserDetailsForm from "./booking/UserDetailsForm";
import SummaryPayment from "./booking/SummaryPayment";

import { Service, FormData } from "../types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

// Default services, can be moved to API later
const services: Service[] = [
    { id: 1, name: "Corte & Estilo", price: 25, duration: "45 min" },
    { id: 2, name: "Coloración Premium", price: 45, duration: "90 min" },
    { id: 3, name: "Tratamientos SPA", price: 30, duration: "60 min" },
    { id: 4, name: "Peinados Especiales", price: 35, duration: "60 min" }
];

export default function BookingSystem() {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [formData, setFormData] = useState<FormData>({ nombre: "", email: "", telefono: "" });
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntentId, setPaymentIntentId] = useState("");

    const days = eachDayOfInterval({ start: currentMonth, end: endOfMonth(currentMonth) });
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    useEffect(() => {
        const fetchSlots = async () => {
            setIsLoadingSlots(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/available-slots?fecha=${selectedDate.toISOString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setAvailableSlots(data);
                } else {
                    toast.error("Error al obtener horas disponibles.");
                }
            } catch (error) {
                console.error("Error fetching slots:", error);
                toast.error("Error de conexión al obtener horarios.");
            } finally {
                setIsLoadingSlots(false);
            }
        };
        fetchSlots();
    }, [selectedDate]);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const initiatePayment = async () => {
        if (!selectedService) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-payment-intent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: selectedService?.price })
            });
            if (res.ok) {
                const data = await res.json();
                setClientSecret(data.clientSecret);
                setStep(5);
            } else {
                toast.error("Error al iniciar el pago.");
            }
        } catch (error) {
            console.error("Error initiating payment:", error);
            toast.error("No se pudo conectar con el servidor de pagos.");
        }
    };

    const handleBookingComplete = async (paidPaymentIntentId: string) => {
        if (!selectedService) return;
        const appointmentData = {
            nombreCliente: formData.nombre,
            emailCliente: formData.email,
            telefonoCliente: formData.telefono,
            servicio: selectedService?.name,
            precio: selectedService?.price,
            fecha: selectedDate,
            hora: selectedTime,
            stripePaymentIntentId: paidPaymentIntentId
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData)
            });

            if (res.ok) {
                setStep(6);
                toast.success("¡Cita confirmada con éxito!");
            } else {
                const errorData = await res.json();
                toast.error("Error al confirmar la cita: " + (errorData.error || "Error desconocido"));
                setStep(4);
            }
        } catch (error) {
            console.error("Error booking:", error);
            toast.error("Error de conexión al confirmar la cita.");
            setStep(4);
        }
    };

    const appearance = { theme: 'stripe' as const };
    const options = { clientSecret, appearance };

    return (
        <section id="booking" className="py-24 bg-background">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Reserva Online</h2>
                    <h3 className="text-4xl font-serif">Tu Momento es Ahora</h3>
                </div>

                <div className="bg-secondary/50 rounded-2xl p-8 md:p-12 shadow-xl border border-border overflow-hidden min-h-[500px] flex flex-col justify-center">
                    {/* Progress Bar */}
                    {step <= 5 && (
                        <div className="flex justify-between mb-12 relative">
                            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2 z-0" />
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-500 ${
                                        step >= i ? "bg-primary text-white" : "bg-background text-muted border border-border"
                                    }`}
                                >
                                    {i === 1 && <CalendarIcon size={18} />}
                                    {i === 2 && <Clock size={18} />}
                                    {i === 3 && <User size={18} />}
                                    {i === 4 && <CreditCard size={18} />}
                                    {i === 5 && <CheckCircle2 size={18} />}
                                </div>
                            ))}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <ServiceSelection
                                services={services}
                                selectedService={selectedService}
                                onSelect={(s) => { setSelectedService(s); handleNext(); }}
                            />
                        )}

                        {step === 2 && (
                            <DateSelection
                                currentMonth={currentMonth}
                                days={days}
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                                availableSlots={availableSlots}
                                isLoadingSlots={isLoadingSlots}
                                onPrevMonth={prevMonth}
                                onNextMonth={nextMonth}
                                onDateSelect={setSelectedDate}
                                onTimeSelect={setSelectedTime}
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}

                        {step === 3 && (
                            <UserDetailsForm
                                formData={formData}
                                setFormData={setFormData}
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}

                        {step === 4 && selectedService && (
                            <SummaryPayment
                                selectedService={selectedService}
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                                onInitiatePayment={initiatePayment}
                                onBack={handleBack}
                            />
                        )}

                        {step === 5 && clientSecret && selectedService && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-md mx-auto"
                            >
                                <h4 className="text-xl font-serif mb-8 text-center">Pago Seguro</h4>
                                <Elements stripe={stripePromise} options={options}>
                                    <PaymentForm
                                        amount={selectedService!.price}
                                        email={formData.email}
                                        onSuccess={handleBookingComplete}
                                        onCancel={() => setStep(4)}
                                    />
                                </Elements>
                            </motion.div>
                        )}

                        {step === 6 && selectedService && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                                    <CheckCircle2 size={48} className="text-green-500 animate-pulse" />
                                </div>
                                <h4 className="text-3xl font-serif text-accent mb-4">¡Reserva Confirmada!</h4>
                                <p className="text-muted mb-8 max-w-md mx-auto">
                                    Gracias {formData.nombre}, hemos recibido tu pago de {selectedService!.price}€. <br />
                                    Te hemos enviado un correo de confirmación a <strong>{formData.email}</strong>.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="border border-primary text-primary px-10 py-3 rounded-full hover:bg-primary hover:text-white transition-all uppercase tracking-widest text-xs font-bold"
                                >
                                    Volver al Inicio
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
