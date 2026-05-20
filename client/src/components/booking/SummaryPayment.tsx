import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Service } from "../../types";

interface Props {
    selectedService: Service;
    selectedDate: Date;
    selectedTime: string;
    onInitiatePayment: () => void;
    onBack: () => void;
}

export default function SummaryPayment({ selectedService, selectedDate, selectedTime, onInitiatePayment, onBack }: Props) {
    return (
        <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
        >
            <div className="mb-8 p-8 bg-white rounded-2xl border border-primary/20 shadow-sm">
                <h4 className="font-serif text-2xl mb-6 text-primary underline underline-offset-8 decoration-primary/20">Resumen de tu Cita</h4>
                <div className="space-y-4 text-left max-w-sm mx-auto">
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                        <span className="text-muted text-sm uppercase tracking-widest">Servicio</span>
                        <strong className="text-accent">{selectedService.name}</strong>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                        <span className="text-muted text-sm uppercase tracking-widest">Fecha</span>
                        <strong className="text-accent">{format(selectedDate, 'PPP', { locale: es })}</strong>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                        <span className="text-muted text-sm uppercase tracking-widest">Hora</span>
                        <strong className="text-accent">{selectedTime}</strong>
                    </div>
                    <div className="flex justify-between items-center pt-4 text-2xl font-serif">
                        <span className="text-accent">Total</span>
                        <strong className="text-primary">{selectedService.price}€</strong>
                    </div>
                </div>
            </div>

            <p className="text-sm text-muted mb-8 italic max-w-xs mx-auto">
                * El pago se realiza de forma segura a través de Stripe para confirmar tu reserva.
            </p>

            <button
                onClick={onInitiatePayment}
                className="bg-primary text-white px-12 py-4 rounded-full shadow-xl hover:bg-accent transition-all uppercase tracking-widest text-sm font-bold w-full md:w-auto"
            >
                Proceder al Pago
            </button>
            <button onClick={onBack} className="w-full mt-6 text-muted text-sm border-b border-transparent hover:border-muted inline-block transition-all">Atrás</button>
        </motion.div>
    );
}
