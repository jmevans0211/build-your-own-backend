const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.get('/api/v1/continents', (request, response) => {
  database('continents').select()
    .then((continents) => {
      response.status(200).json(continents)
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on ${app.get('port')}`)
});
