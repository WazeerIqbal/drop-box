import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headrs: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    })
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //save the token
      localStorage.setItem('token', json.authtoken)
      navigate.push("/")

    }
    else {
      alert("Invalid credentials")
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <form className="col-4  my-3" onSubmit={handleSubmit}>

      <div className="col-auto my-3" >
        <label htmlFor="email" className="visually-hidden">Email</label>
        <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" placeholder="Email" name='email' required />
      </div>
      <div className="col-auto">
        <label htmlFor="password" className="visually-hidden">Password</label>
        <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" placeholder="Password" name='password' required />
      </div>
      <div className="col-auto my-3">
        <button type="submit" className="btn btn-primary mb-3">Submit</button>
      </div>
    </form>
  )
}

export default Login
