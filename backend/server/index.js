const express = require('express');
const cors = require('cors');
//const jwt = require('jsonwebtoken');
const { client,
    createTables,
    createUser,
    createProduct,
    createProduct_Type,
    createCart,
    fetchAllUsers,
    fetchAllProducts,
    fetchProduct_Types,
    fetchProduct,
    fetchProductsOfType,
    fetchCarts,
    fetchCartProducts,
    createCartProduct,
    deleteCartProduct,
    fetchUser
    // createUserAndToken,
    // findUserWithToken,
    // authenticate
} = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

// get route all users
app.get('/api/users', async(req,res,next)=> {
  try {
    res.send(await fetchAllUsers());
  } catch(ex) {
    next(ex);
  }
});
//get one user (get details)
app.get('/api/user/:id', async(req, res, next)=> {
  try {
    res.send(await fetchUser(req.params.id));
  } catch(ex) {
    next(ex);
  }
});
// post add user to users (register)

// post user login 

// delete user

// get route all products
app.get('/api/products', async(req,res,next)=> {
  try {
    res.send(await fetchAllProducts());
  } catch(ex) {
    next(ex);
  }
});
// get route for single product
app.get('/api/product/:id', async(req, res, next)=> {
  try {
    res.send(await fetchProduct(req.params.id));
  } catch(ex) {
    next(ex);
  }
});
// add product to products (NOT WORKING)
app.post('/api/products', async(req, res, next)=> {
  const { name, product_price, description, img, qty_available, product_type} = req.body;
  try {
    res.send(201).send(await createProduct(name, product_price, description, img, qty_available, product_type));
  } catch(ex) {
    next(ex);
  }
});
//get route product_types 
app.get('/api/product_types', async(req,res,next)=> {
  try {
    res.send(await fetchProduct_Types());
  } catch(ex) {
    next(ex);
  }
});
//get products of product type
app.get('/api/products/products_type/:id', async(req, res, next)=> {
  try {
    res.send(await fetchProductsOfType(req.params.id));
  } catch(ex) {
    next(ex);
  }
});
// patch add product to cart 

// patch or put edit cart_product

// delete cart_product

//get route for carts
app.get('/api/carts', async(req,res,next)=> {
  try {
    res.send(await fetchCarts(req.params.id));
  } catch(ex) {
    next(ex);
  }
});
//get route for user's cart products
app.get('/api/carts/:cartId/cart_products', async(req, res, next)=> {
  try{
    res.send(await fetchCartProducts(req.params.cartId));
  } catch(err) {
    next(err);
  }
});


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
  const [ColdBrew, Latte] = await Promise.all([
    createProduct({name: 'Cold Brew', product_price: 4.00, 
    description: 'Black coffee on ice.', 
    img: 'https://www.seriouseats.com/thmb/U-LNa28nrdRi_nRUjcJAjDgtd5g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/IcedCoffee-9e66377b914346d9b166bf45d2065619.jpg',
     qty_available: 100, product_type: coffee.id}),
    createProduct({name: 'Latte', product_price: 5.00, 
    description: 'Coffee on ice with milk.', 
    img: 'https://www.caffesociety.co.uk/assets/recipe-images/latte-small.jpg',
     qty_available: 100, product_type: coffee.id}),
    createProduct({name: 'Macchiato', product_price: 5.50, 
    description: 'A double shot of espresso, topped with steamed milk',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkevAXm9AtKYpYJg6MB3nv3t8iT2nCcehjSw&s',
    qty_available:'100', product_type: coffee.id}),
    createProduct({name: 'Dirty Chai Latte', product_price: 6.00,
    description: 'Coffee with Chai tea and milk', 
    img: 'https://shottbeverages.com/wp-content/uploads/2020/06/dirty_chai_vanill_latte.jpg',
    qty_available: 100, product_type: coffee.id}),
    createProduct({name: 'Frappucino', product_price: 6.50, 
    description: 'Coffee blended with ice and milk. Topped with whip cream.',
    img: 'https://freshbeanbakery.com/wp-content/uploads/2023/06/CaramelFrap-Photo3-683x1024.jpg',
    qty_available: 100, product_type: coffee.id}),
    createProduct({name: 'Espresso shot', product_price: 2.50, 
    description: 'A single shot of espresso.',
    img: 'https://www.acouplecooks.com/wp-content/uploads/2021/08/How-to-make-espresso-009.jpg',
    qty_available: 100, product_type: coffee.id}),
    createProduct({name: 'Colombian Whole Bean', product_price: 16.50,
    description: 'Whole beans imported from Colombia.',
    img: 'https://sfbaycoffee.com/cdn/shop/articles/SFB_LFS_BeansVsGrounds_blog.jpg?v=1686342662',
    qty_available: 100, product_type: wholebean.id}),
    createProduct({name: 'Chemex', product_price: 40.00,
    description: 'Coffee maker made out of glass.',
    img: 'https://m.media-amazon.com/images/I/710HUhFaSLL.jpg',
    qty_available: 100, product_type: brew.id}),
    createProduct({name: 'French Press', product_price: 25.00,
    description: 'Coffee maker made out of glass with handle',
    img: 'https://m.media-amazon.com/images/I/61UeQjIpANL._AC_UF894,1000_QL80_.jpg',
    qty_available: 100, product_type: brew.id})
  ]);

  // Carts
  const [ one, two, three ] = await Promise.all([
    createCart({ user_id: harry.id }),
    createCart({ user_id: hermoine.id }),
    createCart({ user_id: ron.id })
  ]);

  //console.log(await fetchAllUsers());
  console.log(await fetchAllProducts());
  //console.log(await fetchCarts());

  // Cart Products
  const cartProducts = await Promise.all([
    createCartProduct(one.id, ColdBrew.id, 1),
    createCartProduct(two.id, ColdBrew.id, 1),
    createCartProduct(two.id, Latte.id, 1),
    createCartProduct(three.id, Latte.id, 1)
  ]);
  // console.log(await fetchCartProducts(one.id));
  // console.log(await fetchCartProducts(two.id));
  // await deleteCartProduct(cartProducts[0].id);
  //console.log(await fetchCartProducts());
  
  app.listen(3000, () => {
    console.log('server is listening on port 3000!');
  });
};
init();