const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
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
            console.log('SUSCRIBIEDNOSE A LA PAGINA !');
            // Llama a esta función en el momento adecuado, por ejemplo, cuando inicie el servidor
            //suscribirPagina();
        } else {
            res.sendStatus(403);
        }
    }
});

// Endpoint para recibir datos de leads
const filePath = path.join(__dirname, 'leads.txt');
// Tu endpoint webhook
app.post('/webhook', (req, res) => {
    console.log('se conecto al post:');
    const body = req.body;
    console.log('body:', body);

    // Verificar que el cuerpo contenga un evento de leadgen
    if (body.object === 'page' && body.entry) {
        body.entry.forEach(entry => {
            const changes = entry.changes;

            changes.forEach(change => {
                if (change.field === 'leadgen') {
                    const leadData = change.value;

                    // Manejar los datos del lead aquí
                    console.log('data recibida:', leadData);

                    const leadId = leadData.leadgen_id; // ID del lead
                    const pageAccessToken = 'EAAPQhNuG0cYBO77iqTVZAluWNn5qELrBe5DWzvKvuZCyHNWcaZBKrSPb44z5sKltt3ZCwcBcaisHJZCBRMJxpII908e4rx00dZAsz9DucxOFcKN2mMZAgG9ZBruY1S87wT2oswkaY9dNbPMrXjunNhQSdGLMabGOSSyuGN6kext8Lc8jLkKqc2aVQGVihJF3QYyMfMTL0naTmvvZCwZBwqc0Sz'; // Debes usar tu token de acceso a la página

                    // Obtener los detalles del lead desde Facebook Graph API
                    const url = `https://graph.facebook.com/v20.0/${leadId}?access_token=${pageAccessToken}`;

                    // Realizar solicitud para obtener los datos del lead
                    fetch(url)
                        .then(response => response.json())
                        .then(leadResponse => {
                            console.log('Datos del formulario recibidos:', leadResponse);

                            // Aquí puedes acceder a los datos del formulario (leadResponse.field_data)
                            const leadDataText = leadResponse.field_data.map(field => `${field.name}: ${field.values}`).join('\n');

                            // Guardar los datos en un archivo txt
                            fs.appendFile(filePath, `Lead ID: ${leadId}\n${leadDataText}\n\n`, err => {
                                if (err) {
                                    console.error('Error al escribir en el archivo:', err);
                                } else {
                                    console.log('Datos guardados en leads.txt');
                                }
                            });
                        })
                        .catch(error => {
                            console.error('Error al obtener los datos del lead:', error);
                        });
                }
            });
        });

        res.sendStatus(200); // Responder con 200 para confirmar que recibiste el webhook
    } else {
        res.sendStatus(404); // Si no es un evento de página o no se encuentra, responder con 404
    }
});





// Asegúrate de tener los valores correctos para el PAGE_ID y ACCESS_TOKEN





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
