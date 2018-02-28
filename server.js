const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('client/build'));
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if(err){
    console.log(err);
    return;
  }

  const db = client.db('bucketlist');
  console.log('connected to db');


  app.listen(3000, function () {
    console.log('App is running on port ' + this.address().port);
  });


});
