const newrelic = require('newrelic');
const url = require('url');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

const port = process.env.PORT || 3000;

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
  request.get(`http://127.0.0.1:3001/messages/${req.params.id}`, function serviceRes(err, httpRes, body) {
    if (err) {
      res.status(500).send(err);
      return;
    }
      res.status(200).send(body)
  });
  // request(`http://localhost:3001/messages/${req.params.id}`).pipe(res);
});

app.post('/messages', function proxyPost(req, res) {
  request.post({url: `http://127.0.0.1:3001/messages`, body: req.body, json: true}, function serviceRes(err, httpRes, body) {
    if (err){
      res.status(500).send(err);
      return;
    }
    res.status(201).send(body);
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
