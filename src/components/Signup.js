import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "name", email: "email", password: "password", cpassword: "cpassword" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const { name, email, password } = credentials;
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headrs: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name, email, password })

        })
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //save the token
            localStorage.setItem('token', json.authtoken)
            navigate("/")

        }
        else {
            alert("Invalid credentials")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form className="col-4  my-3" onSubmit={handleSubmit}>

                <div className="col-auto my-3" >
                    <label htmlFor="name" className="visually-hidden">Name</label>
                    <input type="text" className="form-control" onChange={onChange} value={credentials.name} id="name" placeholder="Name" name='name' />
                </div>
                <div className="col-auto my-3" >
                    <label htmlFor="email" className="visually-hidden">Email</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" placeholder="Email" name='email' />
                </div>
                <div className="col-auto my-3">
                    <label htmlFor="password" className="visually-hidden">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" placeholder="Password" name='password' required minLength={5} />
                </div>
                <div className="col-auto my-3">
                    <label htmlFor="password" className="visually-hidden">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.cpassword} id="cpassword" placeholder="Confirm Password" name='cpassword' required minLength={5} />
                </div>
                <div className="col-auto my-3">
                    <button type="submit" className="btn btn-primary mb-3">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
