const path = require('path');
const express = require('express');

const app = express();

app.use('/css', express.static('./css'));

app.get('/', (req, res) => {
  console.log('You touched the default route!');
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/api', (req, res) => {
  res.send('<b>Welcome to the UMD API!</b>');
});

app.listen(3000, (error) => {
  if (error) {
    console.log('Error 404 not found', error);
  } else {
    console.log('Listening on: http://localhost:3000');
    console.log('environment: Development');
  }
});