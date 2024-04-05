const express = require('express');
const router = express.Router();
const {  
    fetchCarts,
    fetchCartProducts
} = require('../db');

//get route for carts
router.get('/api/carts', async(req,res,next)=> {
  try {
    res.send(await fetchCarts(req.params.id));
  } catch(ex) {
    next(ex);
  }
});

//get route for user's cart products
router.get('/api/carts/:cartId/cart_products', async(req, res, next)=> {
  try{
    res.send(await fetchCartProducts(req.params.cartId));
  } catch(err) {
    next(err);
  }
});

// patch add product to cart 

// patch or put edit cart_product

// delete cart_product

  

module.exports = router;