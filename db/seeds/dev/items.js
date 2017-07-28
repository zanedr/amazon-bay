exports.seed = function(knex, Promise) {
  return knex('purchasehistory').del()
  .then(() => {
    return knex('items').del()
  })
  .then(() => {
    let itemPromises = createItems(knex)
    return Promise.all([...itemPromises])
  });
};

const createItems = (knex) => {
  return amBayItems.map((item) => {
    const {title, description, picture, price } = item;

    return knex('items').insert({
      title, description, picture, price
    });
  });
};

const amBayItems = [
  {
    title: 'sweet, sweet guitar',
    description: 'a tool for sweet, sweet tunes',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/4/45/GuitareClassique5.png',
    price: 42000
  },
  {
    title: 'sweet, sweet bass',
    description: 'rhythm for those sweet, sweet tunes',
    picture: 'http://www.bouldercreekguitars.com/wp-content/uploads/2013/04/Acoustic-Bass-EBR3-N41-450x800.jpg',
    price: 53000
  },
  {
    title: 'sweet, sweet keys',
    description: "let's class it up a bit",
    picture: 'http://hammondorganco.com/wp-content/uploads/2014/10/MiniB3Ensemble-941.jpg',
    price: 82500
  },
  {
    title: 'a drummer',
    description: 'someone has to do it',
    picture: 'https://villagevoice.freetls.fastly.net/wp-content/uploads/2013/03/animal_2_thumb_550x327.jpg',
    price: 5000
  }
]