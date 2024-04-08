const express = require('express');
const router = express.Router();
const {  
    fetchAllCarts,
    fetchCart,
    fetchCartProducts,
    createCartProduct,
    deleteCartProduct
} = require('../db');

// get route for all carts
router.get('/', async(req,res,next)=> {
  try {
    res.send(await fetchAllCarts());
  } catch(ex) {
    next(ex);
  }
});
//get route for single cart ('/api/carts')
router.get('/:cartId', async (req,res, next)=> {
  try{
    res.send(await fetchCart(req.params.cartId));
  } catch(ex) {
    next(ex);
  }
})

//get route for user's cart products
router.get('/:cartId/cart_products', async(req, res, next)=> {
  try{
    res.send(await fetchCartProducts(req.params.cartId));
  } catch(err) {
    next(err);
  }
});

// POST route for creating a cartProduct. Adding a product to cart
router.post('/:cartId/cart_products/:cartProductId', async(req, res, next)=> {
  try {
    res.status(201).send(await createCartProduct(req.params.userId, req.params.cartProductId));
  } catch(err) {
    next(err);
  }
});

// patch add product to cart 

// patch or put edit cart_product

// delete cart_product
router.delete('/:cartId/cart_products/:cartProductId', async(req, res, next)=> {
  try{
    await deleteCartProduct(req.params.cartId, req.params.cartProductId);
    res.status(204);
  } catch(err) {
    next(err);
  }
})

  

module.exports = router;