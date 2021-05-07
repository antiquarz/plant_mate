const express = require('express')
const asyncHandler = require('express-async-handler')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
// import 'dotenv/config';

const app = express();
const port = 3000;
// const url = 'mongodb://localhost:27017/plant_mate';
const url = 'mongodb://165.22.82.241:27017/plant_mate';


app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log(req.body);

  return res.send(req.body);
});

// app.get('/sensor_data', async (req, res, next) => {
//   try {
//     const sensorData = await getSensorData(req.body);
//     console.log(sensorData);
//     return res.send(sensorData);
//   } catch (e) {
//     //this will eventually be handled by your error handling middleware
//     next(e)
//   }
//   // return await getSensorData(req.body);
// });

app.get('/sensor_data', asyncHandler(async (req, res, next) => {
  console.log(req.body);
    MongoClient.connect(url, function (err, db) {
    if (err) throw err;
      var query = req.body;
    var dbo = db.db("plant_mate");

    dbo.collection("sensor_data").find(query).toArray(function (err, result) {
      if (err) throw err;
      // console.log(result);
      return res.send(result);

    });
  });
}))


app.post('/sensor_data', (req, res) => {
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


var saveSensorData = (obj) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      throw err;
    }
    var dbo = db.db("plant_mate");

    //ADD DATA
    dbo.collection("sensor_data").insertOne(obj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

var getSensorData = async (obj) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var query = { temperature: "27" };
    var dbo = db.db("plant_mate");

    dbo.collection("sensor_data").find(query).toArray(function (err, result) {
      if (err) throw err;
      // console.log(result);
      return result;
      db.close();
    });
  });
}