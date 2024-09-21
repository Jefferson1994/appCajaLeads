const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar solicitudes JSON
app.use(bodyParser.json());

// Endpoint de verificación
app.get('/webhook', (req, res) => {
    console.log('se conecto al get:', body);

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === 'jeffvega1994pruebascaja2024') {
            console.log('Webhook verified!');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// Endpoint para recibir datos de leads
app.post('/webhook', (req, res) => {
    const body = req.body;

    // Manejar los datos del lead aquí
    console.log('Received lead data:', body);

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
