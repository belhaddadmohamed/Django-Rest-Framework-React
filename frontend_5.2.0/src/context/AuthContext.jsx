import {React, createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({children}) => {

    ////////////// VARIABLES //////////////

    const [authToken, setAuthToken] = useState(() => 
        localStorage.getItem('authToken')
            ? JSON.parse(localStorage.getItem('authToken'))
            : null
    )

    const [user, setUser] = useState(() => 
        localStorage.getItem('authToken')
            ? jwtDecode(localStorage.getItem('authToken'))
            : null
    )

    const [loading, setLoading] = useState(true)

    const history = useHistory()


    ////////////// METHODS //////////////
  
    const loginUser = async (email, password) => {
        const response = await fetch('http://127.0.0.1:8000/api/token/',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = await response.json()
        console.log(data)

        if(response.status === 200){
            console.log('loggedIn', jwtDecode(data.access))
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
            history.push('/dashboard')   // Redirect the user to home
        } else {
            alert("Something went wrong ! " + response.status)
        }
    }


    const registerUser = async (username, email, password, password2) => {
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username, email, password, password2
            })
        })

        const data = await response.json()

        if(response.status === 201){
            console.log("New user has been created!")
            history.push('/login')
        }else{
            alert("Something went wrong! " + response.status)
        }
    }


    const logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        history.push('/login')
    }


    const context_data = {
        user,
        setUser,
        authToken,
        setAuthToken,
        loginUser,
        registerUser,
        logoutUser,
    }


    useEffect(()=>{
        // In case we refresh the Token(authToken) we need to update the user
        if(authToken){
            setUser(jwtDecode(authToken.access))
            // console.log('User set to:', jwtDecode(authToken.access))
        }
        setLoading(false)
    },[authToken, loading])


    return (
        <AuthContext.Provider value={context_data}>
            {/* If the user is in the process of loading don't show anything : to prevent the click on the buttons again*/}
            {loading ? null : children}
        </AuthContext.Provider>
    )

}
