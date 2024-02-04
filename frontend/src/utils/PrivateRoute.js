import {useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function PrivateRoute({children, ...rest}) {
    let {user} = useContext(AuthContext)

  return (
    <Route {...rest}> {!user ? <Redirect to='login/' /> : children} </Route>
  )
}

export default PrivateRoute