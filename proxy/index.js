require('newrelic');
const request = require('request');
const url = require('url');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.static('./public'));
app.use(bodyParser.json());

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

app.get('/messages', (req, res) => {
  res.redirect(url.format({
    protocol: 'http',
    hostname: 'localhost',
    port: 3001,
    pathname: '/messages',
    query: req.query,
  }));
});

app.post('/booking', (req, res) => {
  res.redirect(307, 'http://localhost:3003/booking');
});
app.get('/listinginfo/:id', (req, res) => {
  request(`http://localhost:3004/listinginfo/${req.params.id}`, function (error, response, body) {
    if (error) {
      res.status(500).end();
    } else {
      res.status(200);
      res.send(response.body);
    }
  });
})
app.get('/listinginfo1/*', (req, res) => {
  console.log('here we are good sir');
  res.sendFile(path.join(__dirname, '..', '/public', 'index.html'));
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
