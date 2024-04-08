import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({token, setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
    const { token }= await response.json();
    localStorage.setItem('token', token);
    setToken(token);
  }
  useEffect(()=> {
    if(token) {
      Navigate('/');
    }
  }, [token, Navigate])

  return(
    <div>
      <h1>LOG-IN</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <h2>Username:</h2>
          <input type="email" placeholder="EMAIL@gmail.com" value={username} 
          onChange={(e)=> setUsername(e.target.value)}/>
        </label>
        <label>
          <h2>Password:</h2>
          <input type="text" placeholder="PASSWORD..." value={password} 
          onChange={(e)=> setPassword(e.target.value)} />
        </label>
        <button type="submit"> Login </button>
      </form>
    </div>
  );
}

export default Login;