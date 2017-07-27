const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

var express = require('express');
var app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

//GET route for items
app.get('/items', (req, res) => {
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
app.get('/purchasehistory', (req, res) => {
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
app.post('/addpurchasehistory', (req, res) => {
    console.log('body', req.body)
//   const { price } = req.body

  if (!price) {
    return response.status(422).send({
      error: 'No price included with purchase history'
    })
  }
//     else {
//       database('purchashistory').insert({ price }, 'id')
//       .then(() => {
//         return res.status(201)
//       }).catch((error) => {
//         return res.status(500);
//     });
//     }
  });

var PORT = 3000;
app.listen(PORT, function() {
    console.log('http://localhost:' + PORT);
});