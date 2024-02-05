import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function Navbar() {
  const {logoutUser, user} = useContext(AuthContext)


  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img style={{"width": "100px", "height": "40px", "objectFit": "contain"}} src="https://picsum.photos/600/300" alt=""/>
          
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/homepage">Home</Link>
            </li>

            {/* Check if the user is loggedIn */}
            { user ? 
            ( <ul className="d-flex list-unstyled">
                <li className="nav-item">
                  <Link className="nav-link" to='/dashboard'>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={logoutUser}>Logout</button>
                </li>
              </ul>) :
            ( <ul className="d-flex list-unstyled"> 
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li> 
              </ul> )}
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar