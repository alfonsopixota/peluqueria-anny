import { motion } from "framer-motion";
import { format, isSameDay, startOfToday } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    currentMonth: Date;
    days: Date[];
    selectedDate: Date;
    selectedTime: string;
    availableSlots: string[];
    isLoadingSlots: boolean;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onDateSelect: (date: Date) => void;
    onTimeSelect: (time: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function DateSelection({
    currentMonth, days, selectedDate, selectedTime, availableSlots, isLoadingSlots,
    onPrevMonth, onNextMonth, onDateSelect, onTimeSelect, onNext, onBack
}: Props) {
    return (
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
                            <button onClick={onPrevMonth} className="p-2 hover:bg-white rounded-full"><ChevronLeft size={20} /></button>
                            <button onClick={onNextMonth} className="p-2 hover:bg-white rounded-full"><ChevronRight size={20} /></button>
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
                                    onClick={() => onDateSelect(day)}
                                    className={`aspect-square rounded-full flex items-center justify-center text-sm transition-all ${
                                        isSelected ? "bg-primary text-white scale-110 shadow-lg" :
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
                                    onClick={() => onTimeSelect(time)}
                                    className={`py-3 rounded-lg border text-sm transition-all ${
                                        selectedTime === time ? "bg-primary text-white border-primary shadow-md" : "bg-background border-border hover:border-primary/50"
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
                        onClick={onNext}
                        className="w-full mt-10 bg-primary text-white py-4 rounded-full disabled:opacity-50 uppercase tracking-widest text-xs font-bold shadow-lg shadow-primary/20"
                    >
                        Continuar
                    </button>
                    <button onClick={onBack} className="w-full mt-4 text-muted text-sm border-b border-transparent hover:border-muted inline-block transition-all">Atrás</button>
                </div>
            </div>
        </motion.div>
    );
}
