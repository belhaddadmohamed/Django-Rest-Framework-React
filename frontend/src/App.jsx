import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute' 

import Navbar from './views/Navbar'
import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'
import Footer from './views/Footer'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar/>

        <Switch>
          <PrivateRoute component={HomePage} path="/dashboard" exact />
          <Route component={LoginPage} path="/login" />
        </Switch>

        <Footer/>
      </AuthProvider>
    </Router>
  )
}

export default App
