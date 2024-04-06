import React from 'react'
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {

    //active the crrent component
    let location = useLocation();
    React.useEffect(() => {


    }, [location]);

    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Drop-Box</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                        </li>


                    </ul>
                    <Link className="btn btn-primary mx-2" to="login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-2" to="signup" role="button">Sign Up</Link>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
