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
    });
});

app.get('/api/v1/countries', (request, response) => {
  database('countries').select()
    .then((countries) => {
      response.status(200).json(countries)
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/countries/:id', (request, response) => {
  database('countries').where('id', request.params.id).select()
    .then(country => {
      if (country.length) {
        response.status(200).json(country);
      } else {
        response.status(404).json({ 
          error: `Could not find country with an id of ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/continents/:id', (request, response) => {
  database('continents').where('id', request.params.id).select()
    .then(continent => {
      if (continent.length) {
        response.status(200).json(continent);
      } else {
        response.status(404).json({ 
          error: `Could not find continent with an id of ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/continents', (request, response) => {
  const continent = request.body;

  for(let requiredParameter of ['continent', 'land_area']) {
    if(!continent[requiredParameter]) {
      return response.status(422).send({ error: 'Please provide a continent and its land area'})
    }
  }

  database('continents').insert(continent, 'id')
    .then(continent => {
      response.status(201).json({ id: continent[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

app.post('/api/v1/countries', (request, response) => {
  const country = request.body;
  console.log('rewuqa.body', request.body)

  for(let requiredParameter of ['country', 'happiness_score']) {
    if(!country[requiredParameter]) {
      return response.status(422).send({ error: 'Please provide a country and its happiness score'})
    }
  }

  database('countries').insert(country, 'id')
    .then(country => {
      response.status(201).json({ id: country[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on ${app.get('port')}`)
});
