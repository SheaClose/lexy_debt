const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const config = require('./server/serverConfig');
const massive = require('massive');
const ctrl = require('./server/Ctrl');

// app.use(session(serverConfig.session) );
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(`${__dirname}`));
massive(config.postgres)
  .then(dbInstance => {
    app.set('db', dbInstance);
  })
  .catch(err => console.log(err));

// //////////////////////////////////////////////////////////////
// ///////////////    EndPoints        //////////////////////////
// //////////////////////////////////////////////////////////////

app.get('/api/debt', ctrl.getDebt);
app.put('/api/debt', ctrl.addFunds);

app.listen(port, () => {
  console.log('Server listening on port', port);
});
