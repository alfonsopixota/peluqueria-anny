const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const { password } = req.body;
    const adminKey = process.env.ADMIN_SECRET_KEY || 'anny2024';

    if (password === adminKey) {
        const token = jwt.sign(
            { role: 'admin' },
            process.env.JWT_SECRET || 'anny_secret_2024_k3y',
            { expiresIn: '2h' }
        );
        return res.json({ token });
    }

    res.status(401).json({ error: 'Contraseña incorrecta' });
});

module.exports = router;
