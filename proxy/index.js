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

// app.get('/photos', (req, res) => {
//   res.redirect(url.format({
//     protocol: 'http',
//     hostname: 'localhost',
//     port: 3002,
//     pathname: '/photos',
//     query: req.query,
//   }));
// });

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

// SDC proxy specific endpoints

app.get('/listings/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/photos/get/:listingId', (req, res) => {
  const { listingId } = req.params;
  res.redirect(url.format({
    protocol: 'http',
    hostname: 'localhost',
    port: 4000,
    pathname: `/photos/get/${listingId}`,
    query: req.query,
  }));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
