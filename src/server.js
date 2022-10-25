require('dotenv').config();
const app = require('./app');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, (err) => { 
  if (err) console.error(err.stack);
  console.log('ouvindo porta', port);
});
