const express = require('express');
//const jwt = require('jsonwebtoken');
const { client,
    createTables,
    createUser,
    createProduct,
    createProduct_Type,
    fetchUsers,
    fetchProducts,
    fetchProduct_Types
} = require('./db');

const app = express();

app.use(express.json());

const init = async() => {
  await client.connect();
  await createTables();
  console.log('tables created');

  // Product Types 
  const [coffee, wholebean, brew] = await Promise.all([
    createProduct_Type({ name: 'coffee'}),
    createProduct_Type({ name: 'wholebean'}),
    createProduct_Type({ name: 'brew'})
  ]);

  // Users
  const [harry, hermoine, ron] = await Promise.all([
    createUser({ username: 'harry', password: 'hogwarts1'}),
    createUser({ username: 'hermoine', password: 'hogwarts2'}),
    createUser({ username: 'ron', password: 'hogwarts3'})
  ]);

  // Products
  const [ColdBrew, Latte, Macchiato, DirtyChai] = await Promise.all([
    createProduct({name: 'Cold Brew', product_price: 4.00, description: 'coffe on ice', 
    img: 'https://www.seriouseats.com/thmb/U-LNa28nrdRi_nRUjcJAjDgtd5g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/IcedCoffee-9e66377b914346d9b166bf45d2065619.jpg',
     qty_available: 100, product_type: coffee.id}),
    createProduct({name: 'Latte', product_price: 5.00, 
    description: 'coffe on ice with milk', 
    img: 'https://www.caffesociety.co.uk/assets/recipe-images/latte-small.jpg',
     qty_available: 100, product_type: coffee.id})
    // createProduct({name: 'Macchiato'}),
    // createProduct({name: 'DirtyChai'})
  ]);
  console.log(await fetchUsers());
  console.log(await fetchProducts());

  app.listen(3000, () => {
    console.log('server is listening on port 3000!');
  });
};
init();