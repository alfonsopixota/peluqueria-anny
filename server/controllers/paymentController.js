const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;
        if (typeof amount !== 'number' || !amount || amount <= 0) {
            return res.status(400).json({ error: 'Monto inválido' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'eur',
            automatic_payment_methods: { enabled: true },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('❌ Error creando payment intent:', error);
        res.status(500).json({ error: 'Error procesando pago' });
    }
};
