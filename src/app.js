const express = require('express');
require('express-async-errors');
const handleError = require('./middlewares/handleError');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);

app.use(handleError);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
