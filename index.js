const express = require('express')
const mongodb = require('mongodb')
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;

const app = express();
const port = 3000

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  console.log(req.body);

  return res.send(req.body);

  return res.send('Received a GET HTTP method');
});

app.post('/sensor_data', (req, res) => {
  console.log(req.body);

  saveSensorData(req.body);
  return res.send(req.body);
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

// MongoClient.connect('mongodb://localhost:27017/plant_mate', function (err, db) {
//   if (err) {
//     throw err;
//   }

//   //GET DATA
//   db.collection('sensor_data').find().toArray(function (err, result) {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//   });
// });


var saveSensorData = (obj) => {
  MongoClient.connect('mongodb://localhost:27017/plant_mate', function (err, db) {
    if (err) {
      throw err;
    }

    //ADD DATA
    var dbo = db.db("plant_mate");
    dbo.collection("sensor_data").insertOne(obj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}