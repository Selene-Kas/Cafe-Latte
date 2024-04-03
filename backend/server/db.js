const pg = require('pg');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/cafe_latte_db');

async function createTables() {
  const SQL = `
  DROP TABLE IF EXISTS cart_products;
  DROP TABLE IF EXISTS carts;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS product_types;
      
  CREATE TABLE users(
    id UUID PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );

  CREATE TABLE carts(
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
  );
  
  CREATE TABLE product_types(
    id UUID PRIMARY KEY,
    name VARCHAR(100)
  );    

  CREATE TABLE products(
    id UUID PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    product_price DECIMAL(4,2) NOT NULL,
    description VARCHAR(700),
    img VARCHAR(800),
    qty_available INTEGER NOT NULL,
    product_type UUID REFERENCES product_types(id) NOT NULL
  );
  
  CREATE TABLE cart_products(
    id UUID PRIMARY KEY,
    cart_id UUID REFERENCES carts(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    qty INTEGER NOT NULL
  );
  `;
  await client.query(SQL);
}

const createUser = async({username, password})=> {
  const SQL = `
    INSERT INTO users(id, username, password) 
    VALUES($1, $2, $3)
    RETURNING * `;
    const response = await client.query(SQL,[uuid.v4(), username, await bcrypt.hash(password, 10)]);
    return response.rows[0];
};

// const createUserAndToken = async({ username, password })=> {
//     const user = await createUser({ username, password });
//     const token = await jwt.sign({ id: user.id }, JWT);
//     return {token};
//   }

const createProduct_Type = async({name})=> {
  const SQL = `
    INSERT INTO product_types(id, name) 
    VALUES($1, $2)
    RETURNING * `;
    const response = await client.query(SQL,[uuid.v4(), name]);
    return response.rows[0];
};

const createProduct = async({name, product_price, description, img, qty_available, product_type})=> {
  const SQL = `
    INSERT INTO products(id, name, product_price, description, img, qty_available, product_type)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING * `;
    const response = await client.query(SQL, [uuid.v4(), name, product_price, description, img, qty_available, product_type]);
    return response.rows[0];
};

const createCart = async({user_id})=> {
  const SQL = `
    INSERT INTO carts(id, user_id)
    VALUES($1, $2)
    RETURNING * `;
  const response = await client.query(SQL, [uuid.v4(), user_id]);
  return response.rows[0];
}

const createCartProduct = async(cart_id, product_id, qty)=> {
  const SQL = `
    INSERT INTO cart_products(id, cart_id, product_id, qty)
    VALUES($1, $2, $3, $4)
    RETURNING * `;
  const response = await client.query(SQL, [uuid.v4(), cart_id, product_id, qty]);
  return response.rows[0];
}

async function fetchAllUsers() {
  const SQL = `
    SELECT * FROM users;
  `;
  const response = await client.query(SQL);
  return response.rows;
}

async function fetchUser(id) {
  const SQL = `
    SELECT * FROM users
    WHERE id = $1
  `;
  const response = await client.query(SQL, [id]); 
  return response.rows;
}

// const authenticate = async({ username, password })=> {
//     const SQL = `
//       SELECT id, password
//       FROM users 
//       WHERE username=$1;
//     `;
//     const response = await client.query(SQL, [username]);
//     if(!response.rows.length || (await bcrypt.compare(password, response.rows[0].password))=== false){
//       const error = Error('not authorized');
//       error.status = 401;
//       throw error;
//     }
//     const token = await jwt.sign({id: response.rows[0].id}, JWT_SECRET);
//     return { token };
//   };

//   const findUserWithToken = async(token)=> {
//     let id;
//     try {
//       const payload = jwt.verify(token, JWT_SECRET);
//       id = payload.id;
//     } catch(ex) {
//       const error = Error('not authorized');
//       error.status = 401;
//       throw error;
//     }
//     const SQL = `
//       SELECT id, username 
//       FROM users 
//       WHERE id=$1;
//     `;
//     const response = await client.query(SQL, [id]);
//     if(!response.rows.length){
//       const error = Error('not authorized');
//       error.status = 401;
//       throw error;
//     }
//     return response.rows[0];
//   };  

async function fetchAllProducts() {
  const SQL = `
    SELECT * FROM products;
  `;
  const response = await client.query(SQL);
  return response.rows;
}
async function fetchProduct(id) {
    const SQL = `
      SELECT * FROM products
      WHERE id = $1
    `;
    const response = await client.query(SQL, [id]); 
    return response.rows;
  }
async function fetchProductsOfType(product_type) {
    const SQL = `
    SELECT * FROM products
    WHERE product_type = $1
  `;
  const response = await client.query(SQL, [product_type]); 
  return response.rows;
}

async function fetchProduct_Types() {
  const SQL = `
  SELECT * FROM product_types;
  `;
  const response = await client.query(SQL);
  return response.rows;
}

async function fetchCarts() {
  const SQL = `
    SELECT * FROM carts;
  `;
  const response = await client.query(SQL);
  return response.rows;
}

const fetchCartProducts = async(cart_id) => {
  const SQL = `
    SELECT * FROM cart_products
    WHERE cart_id = $1
  `;
  const response = await client.query(SQL, [cart_id]);
  return response.rows;
};

const deleteCartProduct = async(id, cart_id)=> {
  const SQL = `
    DELETE FROM cart_products
    WHERE id = $1 AND cart_id = $2
  `;
  await client.query(SQL, [id, cart_id]);
}

module.exports = {
  client,
  createTables,
  createUser,
  createProduct,
  createProduct_Type,
  createCart,
  createCartProduct,
  fetchAllUsers,
  fetchUser,
  fetchAllProducts,
  fetchProduct,
  fetchProductsOfType,
  fetchProduct_Types,
  fetchCarts,
  fetchCartProducts,
  deleteCartProduct,
//   createUserAndToken,
//   findUserWithToken,
//   authenticate
}; 