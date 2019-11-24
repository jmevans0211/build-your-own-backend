// PLEASE NOTE:
  //comments are made AFTER line of code
  //a conscious effort was made to NOT copy and paste

const express = require('express');
//gets access the express framework
const app = express();
//makes 'app' an express app
const environment = process.env.NODE_ENV || 'development';
//specifies environment that application would be running in
const configuration = require('./knexfile')[environment];
//requiring environment from knexfile, hence the bracket notation specifing `environment` from above
const database = require('knex')(configuration);
//connecting to databse through knex using the enviormnet settings that have been specified above


app.set('port', process.env.PORT || 3000);
//accessing our local port, 3000
app.use(express.json());


app.get('/api/v1/continents', (request, response) => {
  //handling a get request for all of the continents. the callback function is our second argument taking two argumnets of resposne and request
  database('continents').select()
  //accessing the correct database, continents.
    .then((continents) => {
      response.status(200).json(continents)
    })
    //waiting for the continents data and if the get request has been made with success, make the status code 200 and json all continents data
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error, please try again later' });
      //if the request is not successful, respond with the status code will be a 500 internal server error
    });
});

app.get('/api/v1/countries', (request, response) => {
  //handles get request for all countries.
  database('countries').select()
  //accessing the correct database, countries.
    .then((countries) => {
      response.status(200).json(countries)
    })
     //waiting for the countries data and if the get request has been made with success, make the status code 200 and json all countries data
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error, please try again later.' });
      //run the catch when the request has not been successful and respond with an internal server error (status code 500)
    });
});

app.get('/api/v1/continents/:id', (request, response) => {
  //handles get request for a single continent
  database('continents').where('id', request.params.id).select()
  //getting access to the countries data pace and selecting the country with the corresponding id
    .then(continent => {
      //waiting for success
      if (continent.length) {
        //if there is a continent row with the corresponding id...
        response.status(200).json(continent);
        //...respond with a 200 status code and json the continent info
      } else {
        //if there is no continent with that id...
        response.status(404).json({ 
          //... respond with a 404 status code and respond with the following string
          error: `Could not find continent with an id of ${request.params.id}`
        });
      }
    })
    .catch(error => {
      //catching that there was no success
      response.status(500).json({ error });
      //responding with a status code of 500 (internal server errror)
    });
});

app.get('/api/v1/countries/:id', (request, response) => {
  //handles get request for a single country
  database('countries').where('id', request.params.id).select()
  //getting access to the countries database, and then with the where statement, selecting that id corresponding to the id inputted into the url
    .then(country => {
      if (country.length) {
        response.status(200).json(country);
        //if there is a row (with a length, same as, length > 0) of data that corresponds to that id, json that country data as a response
      } else {
        response.status(404).json({ 
          error: `Could not find country with an id of ${request.params.id}`
          //if there is no row with that information, a 404 error will be returned
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error: 'Internal server error. Please try again later.' });
      //a catch if the server is down 
    });
});

app.post('/api/v1/continents', (request, response) => {
  const continent = request.body;

  for(let requiredParameter of ['continent', 'land_area']) {
    if(!continent[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { continent: <String>, land_area: <Integer>}. You're missing a ${requiredParameter} property.`})
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

  for(let requiredParameter of ['country', 'happiness_score']) {
    if(!country[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { country: <String>, happiness_score: <Integer>}. You're missing a ${requiredParameter} property.`})
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

app.delete('/api/v1/countries/:id', (request, response) => {
  const { id } = request.params;
  database('countries')
    .where({ id: id}).select()
    .del()
    .then(results => {
      if (results === 0) {
        response.status(404).json(`Could not find country with the id of ${id}.`)
      } else {
        response.status(200).json('Country was deleted with success.')
      }
    })
    .catch(error => {
      response.status(500).json({error: 'Internal server error, please try again.'})
    })
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on ${app.get('port')}`)
});
