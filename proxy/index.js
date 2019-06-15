require('newrelic');
const url = require('url');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

const port = process.env.PORT || 3004;

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.get('/listings/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.get('/booking', (req, res) => {
  request(`http://localhost:3003/booking/?listingid=${req.query.listingid}`, (error, response, body) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(body);
    }
  })
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
  request.post({ url: `http://localhost:3003/booking`, body: req.body, json: true}, (error, response, body) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(body);
    }
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
