const pg = require('pg');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

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
    status VARCHAR(700)
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
    cart_qty INTEGER NOT NULL
  );
  `;
  await client.query(SQL);
}

const createUser = async({username, password})=> {
  const SQL = `
    INSERT INTO users(id, username, password) 
    VALUES($1, $2, $3)
    RETURNING * `;
    const response = await client.query(SQL,[uuid.v4(), username, password]);
    return response.rows[0];
};

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


async function fetchUsers() {
  const SQL = `
    SELECT * FROM users;
  `;
  return client.query(SQL);
}

module.exports = {
  client,
  createTables,
  createUser,
  createProduct,
  createProduct_Type,
  fetchUsers
}; 