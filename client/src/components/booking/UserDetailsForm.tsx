import { motion } from "framer-motion";
import { FormData } from "../../types";

interface Props {
    formData: FormData;
    setFormData: (data: FormData) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function UserDetailsForm({ formData, setFormData, onNext, onBack }: Props) {
    const isComplete = formData.nombre && formData.email && formData.telefono;

    return (
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
                    disabled={!isComplete}
                    onClick={onNext}
                    className="w-full mt-6 bg-primary text-white py-4 rounded-full disabled:opacity-50 uppercase tracking-widest text-xs font-bold shadow-lg shadow-primary/20"
                >
                    Ver Resumen y Pagar
                </button>
                <button onClick={onBack} className="w-full mt-4 text-muted text-sm text-center block border-b border-transparent hover:border-muted transition-all">Atrás</button>
            </div>
        </motion.div>
    );
}
