// import your node modules

const db = require('../data/db.js');

// add your server code starting here
const express = require('express');

const server = express();

server.listen(4000, () => {
  console.log('running');
});