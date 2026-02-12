"use client";

import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

interface PaymentFormProps {
    amount: number;
    email: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function PaymentForm({ amount, email, onSuccess, onCancel }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/booking-success`,
                    receipt_email: email,
                },
                redirect: "if_required",
            });

            if (error) {
                setMessage(error.message ?? "Ocurrió un error inesperado.");
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                await onSuccess();
            }
        } catch (err) {
            console.error(err);
            setMessage("Error al procesar el pago.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />

            {message && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                    {message}
                </div>
            )}

            <div className="flex flex-col gap-3">
                <button
                    disabled={isLoading || !stripe || !elements}
                    className="w-full bg-primary text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs disabled:opacity-50 transition-all shadow-lg hover:shadow-primary/20"
                >
                    {isLoading ? "Procesando..." : `Pagar ${amount}€ y Reservar`}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-muted text-sm hover:text-accent transition-colors"
                >
                    Volver al resumen
                </button>
            </div>
        </form>
    );
}
