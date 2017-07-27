const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const domain = process.env.DOMAIN_ENV || 'localhost:3000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

//GET route for items
app.get('/api/v1/items', (req, res) => {
  database('items').select()
  .then((items) => {
    if (!items) {
      return res.status(404).send({
        error: 'No items were found',
      });
    } else {
      return res.status(200).json(items);
    }
  }).catch((error) => {
    return res.status(500);
  });
});

//GET route for purchase history
app.get('/api/v1/purchasehistory', (req, res) => {
  database('purchasehistory').select()
  .then((purchasehistory) => {
    if (!purchasehistory.length) {
      return res.status(404).send({
        error: 'No order history',
      });
    } else {
      return res.status(200).json(purchasehistory);
    }
  }).catch((error) => {
    return res.status(500);
  });
});

//POST route for purchase history
app.post('/api/v1/addpurchasehistory', (req, res) => {
  const body = req.body;
    if(!body.price){
      return res.status(422).json({ error: 'Please include price with request'})
    }else {
    database('purchasehistory').insert(body, 'id')
      .then((id) => {
        return res.status(201).json({ id: id[0]})
          }).catch((error) => {
            return res.status(500);
    });
    };
  });

var PORT = 3000;
app.listen(PORT, function() {
    console.log('http://localhost:' + PORT);
});

module.exports = app