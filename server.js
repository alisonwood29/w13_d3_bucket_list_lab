const express = require('express');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(express.static('client/build'));
server.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if(err){
    console.log(err);
    return;
  }

  const db = client.db('bucketlist');
  console.log('connected to db');

  server.post('/countries', function (req, res) {
    const countriesCollection = db.collection('countries');
    const countryToSave = req.body;

    countriesCollection.save(countryToSave, function (err, result) {
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(result.ops[0]);
      console.log('saved to db');
    });
  });

  server.get('/countries', function (req, res) {
    const countriesCollection = db.collection('countries');

    countriesCollection.find().toArray(function (err, allCountries) {
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(allCountries);
    });
  });

  server.delete('/countries', function (req, res) {
    const countriesCollection = db.collection('countries');
    const filterObject = {};

    countriesCollection.deleteMany(filterObject, function (err, result) {
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });


  server.listen(3000, function () {
    console.log('App is running on port ' + this.address().port);
  });


});
