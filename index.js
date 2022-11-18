const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors');
require ('dotenv').config();


const app = express();
const port = process.env.port;

//Implementación Cors
app.use(cors());

getConnection();

// Parseo JSON
app.use(express.json());

app.use('/cliente', require('./router/cliente'));
app.use('/etapa-proyecto', require('./router/etapa'));
app.use('/tipo-proyecto', require('./router/tipoProyecto'));
app.use('/universidad', require('./router/universidad'));
app.use('/proyecto', require('./router/proyecto'));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });