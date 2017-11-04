const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;
const app = express();
const massive = require('massive');
const ctrl = require('./server/Ctrl');
const { join } = require('path');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/build'));

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set('db', dbInstance);
  })
  .catch(console.log);

// //////////////////////////////////////////////////////////////
// ///////////////    EndPoints        //////////////////////////
// //////////////////////////////////////////////////////////////

app.get('/api/debt', ctrl.getDebt);
app.put('/api/debt', ctrl.addFunds);

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '/build/index.html'));
});

app.listen(port, () => {
  console.log('Server listening on port', port);
});
