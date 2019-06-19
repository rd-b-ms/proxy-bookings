const newrelic = require('newrelic');
const url = require('url');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const redis = require('redis');
const port = process.env.PORT || 80;
const clientRedis = redis.createClient();
clientRedis.on("error", function (err) {
  console.log("Error " + err);
});

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.get('/listings/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/booking', (req, res) => {
  res.redirect(url.format({
    protocol: 'http',
    hostname: 'localhost',
    port: 3003,
    pathname: '/booking',
    query: req.query,
  }));
});

app.get('/photos', (req, res) => {
  res.redirect(url.format({
    protocol: 'http',
    hostname: 'localhost',
    port: 3002,
    pathname: '/photos',
    query: req.query,
  }));
});

app.get('/listinginfo', (req, res) => {
  res.redirect(url.format({
    protocol: 'http',
    hostname: 'localhost',
    port: 3004,
    pathname: '/listinginfo',
    query: req.query,
  }));
});

app.get('/messages/:id', function proxyGet(req, res) {
  clientRedis.get(req.params.id, (err, reply) => {
    if (err) {
      res.status(500).end();
      return;
    } else if (reply) {
      res.status(200).send(reply);
    } else {
      request.get(`http://18.216.189.181/messages/${req.params.id}`, function serviceRes(err, httpRes, body) {
        if (err) {
          res.status(500).send(err);
          return;
        }
          res.status(200).send(body);
          clientRedis.set(req.params.id, JSON.stringify(body), (err, reply) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(reply);
          });
      });
    }
  })
  // request(`http://localhost:3001/messages/${req.params.id}`).pipe(res);
});

app.post('/messages', function proxyPost(req, res) {
  request.post({url: `http://18.216.189.181/messages`, body: req.body, json: true}, function serviceRes(err, httpRes, body) {
    if (err){
      res.status(500).send(err);
      return;
    }
    res.status(201).send('Success!');
    clientRedis.set(body.listing_id, JSON.stringify(body.results), (err, result) => {
      if (err){
        console.log(err);
        return;
      }
      console.log(result);
    });
  });
});

// app.get('/messages/:id', (req, res) => {
//   res.redirect(url.format({
//     protocol: 'http',
//     hostname: 'localhost',
//     port: 3001,
//     pathname: `/messages/${req.params.id}`,
//     query: req.query,
//   }));
// });

app.post('/booking', (req, res) => {
  res.redirect(307, 'http://localhost:3003/booking');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
