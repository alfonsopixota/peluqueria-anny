import { motion } from "framer-motion";
import { Service } from "../../types";

interface Props {
    services: Service[];
    selectedService: Service | null;
    onSelect: (service: Service) => void;
}

export default function ServiceSelection({ services, selectedService, onSelect }: Props) {
    return (
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
                        onClick={() => onSelect(s)}
                        className={`p-6 rounded-xl border text-left transition-all hover:border-primary hover:shadow-lg ${
                            selectedService?.id === s.id ? "border-primary bg-primary/5 shadow-md" : "border-border bg-background"
                        }`}
                    >
                        <p className="font-bold text-lg mb-1">{s.name}</p>
                        <p className="text-muted text-sm mb-3">{s.duration}</p>
                        <p className="text-primary font-bold">{s.price}€</p>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
