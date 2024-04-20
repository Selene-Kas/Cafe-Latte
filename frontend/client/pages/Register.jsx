import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMe } from "./api";

const Register = ({token, setToken}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstName, lastName , username, password}),
    })
    const { token }= await response.json();
    localStorage.setItem('token', token);
    setToken(token);

  async function getMe(){
    const me = await fetchMe(token);
    return me;
  }
  async function getCreatedCart(userId){
    return await createUserCart(userId);
    }
  const me = await getMe();

  const createUserCart= async(userId)=> {
    try{
      const response = await fetch (`http://localhost:3000/api/carts/newUser/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      return data;
    } catch(error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  }
    const newcart =await getCreatedCart(me.id);
    console.log(me);
    console.log("cart was created: ", newcart);
  }

  useEffect(()=> {
    if(token) {
      Navigate('/');
    }
  }, [token, Navigate])

  return(
    <div>
      <h1>CREATE-ACCOUNT</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <h2>First Name:</h2>
          <input type="text" value={firstName} placeholder="FIRST NAME..."
          onChange={(e)=> setFirstName(e.target.value)}/>
        </label>
        <label>
          <h2>Last Name:</h2>
          <input type="text" value={lastName} placeholder="LAST NAME..."
          onChange={(e)=> setLastName(e.target.value)}/>
        </label>
        <label>
          <h2>Email:</h2>
          <input type="email" value={username} placeholder="EMAIL@gmail.com"
          onChange={(e)=> setUsername(e.target.value)}/>
        </label>
        <label>
          <h2>Password:</h2>
          <input type="text" value={password} placeholder="PASSWORD..."
          onChange={(e)=> setPassword(e.target.value)} />
        </label>
        <button type="submit"> Register </button>
      </form>
    </div>
  );
}

export default Register;
