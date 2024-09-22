const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar solicitudes JSON
app.use(bodyParser.json());

// Endpoint de verificación
app.get('/webhook', (req, res) => {
    console.log('se conecto al get:');

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
    console.log('se conecto al post:');
    const body = req.body;
    console.log('body:',body);

    // Verificar que el cuerpo contenga un evento de leadgen
    if (body.object === 'page' && body.entry) {
        body.entry.forEach(entry => {
            const changes = entry.changes;

            changes.forEach(change => {
                if (change.field === 'leadgen') {
                    const leadData = change.value;

                    // Manejar los datos del lead aquí
                    console.log('data recivida:', leadData);

                    // Puedes acceder a campos específicos del lead, por ejemplo:
                    const leadId = leadData.lead_id;
                    const formId = leadData.form_id;
                    const createdTime = leadData.created_time;

                    // Aquí puedes guardar los datos en tu base de datos, si lo deseas
                }
            });
        });

        res.sendStatus(200); // Responder con 200 para confirmar que recibiste el webhook
    } else {
        res.sendStatus(404); // Si no es un evento de página o no se encuentra, responder con 404
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
