const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const { fetchAllUsers, fetchUser, createUser, login, register } = require('../db');

// get route for all users (PROTECTED)
router.get('/', requireToken, async(req, res, next)=> {
    //res.send('getting all users');
    try {
        const users = await fetchAllUsers();
        res.send(users.rows);
    } catch(ex) {
        next(ex);
    }
});

// get route for single user 
router.get('/:id', async(req, res, next)=> {
    try {
      res.send(await fetchUser(req.params.id));
    } catch(err) {
      next(err);
    }
});
// (LOGIN ROUTE)
router.post('/login', async(req, res, next)=> {
    const {username, password} = req.body;
    try {
      const user = await login(username, password);
      delete user.password;
      const token = jwt.sign(user, "secret" );
      res.send(user, token);
    } catch(err) {
      next(err);
    }
});

// post add user to users (REGISTER ROUTE)
router.post('/', async(req, res, next)=> {
    //res.send(`creating a user with this data: ${JSON.stringify(req.body)}`);
  const { username, password } = req.body;
  try {
    const user = await register(username, password);
    delete user.password;
    const token = jwt.sign(user, "secret" );
    res.send(user, token);
  } catch(err) {
    next(err);
  }
})

// PROTECTED GET ALL USERS ROUTE 
function requireToken(req, res, next) {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, "secret");
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}


router.put('/:id', (req, res)=> {
    res.send(`updating a user with id ${req.params.id} this data: ${JSON.stringify(req.body)}`);
})

// delete user
router.delete('/:id', (req, res)=> {
    res.send(`Delete user with id ${req.params.id}`);
})


module.exports = router;