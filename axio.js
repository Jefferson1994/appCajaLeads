const axios = require('axios');

// Reemplaza con el ID de la página y el token de acceso a la página generado
const PAGE_ID = '403766772825742';
const ACCESS_TOKEN = 'EAAPQhNuG0cYBO8TiqtZBfTtks8JI9jZB9BfWZB8O7q6vWzxOKgMlK9JVZCzpBdkq685nZAhaAu8pZCDZCcqgZBWw7fbwpTff3GUksZB8HhopEqaJEkRvwOCcOMWZCba30SRd0GdwBhroaySRRRWAYHkBOvTvYLnqO9kT6YL94ymZBnwPAr2al4OUr5ZB8rlPqSM8mrh9uffkvuf4b67XjyfrggZDZD'; // Token de acceso a la página obtenido

function suscribirPagina() {
    axios.post(`https://graph.facebook.com/v20.0/${PAGE_ID}/subscribed_apps`, null, {
        params: {
            access_token: ACCESS_TOKEN,
            subscribed_fields: 'leadgen' // Suscribirte a los campos de generación de leads
        }
    })
    .then(response => {
        console.log('Suscripción exitosa:', response.data);
    })
    .catch(error => {
        console.error('Error al suscribir la página:', error.response ? error.response.data : error.message);
    });
}

suscribirPagina();
