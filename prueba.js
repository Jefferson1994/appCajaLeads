const axios = require('axios');

const userAccessToken = 'EAAPQhNuG0cYBOZBFLnd4gJBYTElBZCPciRZBDxykilP3SAUTxyOEQZCVkEUtiMEZBQ4nuEcYnSZAAfvOeeJcq3XvThWVzvhLEgDI5uwkNoBOAg8uXxsnyKyymERlJyqTbbpZBEUSR3CH4qQ1iFTV4G8NRipqUC83qYRhMovx6Q6EIzrqCvK3vUKo2xCFnsJzIl1hRtWahSlMOr8R8uW8uw0xVP8ZCggwRAZDZD';

axios.get('https://graph.facebook.com/v12.0/me/accounts', {
  params: {
    access_token: userAccessToken
  }
})
.then(response => {
  const pageAccessToken = response.data.data[0].access_token;
  console.log('Page Access Token:', pageAccessToken);
})
.catch(error => {
  console.error('Error al obtener el Page Access Token:', error);
});