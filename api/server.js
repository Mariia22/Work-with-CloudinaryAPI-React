const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const { json } = require('body-parser');

const app = express();
app.use(cors());
app.use(json());
app.get('/photos', async (request, response) => {
  return response.send({ message: 'hello' })
});

const PORT = 7000;
app.listen(PORT, console.log(`Server ${PORT}`))