import React, { createContext, useEffect } from 'react' 
import { useHistory } from 'react-router-dom'
import jwt_decode from jwt_decode

const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({children}) => {

    ////////////// VARIABLES //////////////

    const [authToken, setAuthToken] = useState(() => {
        localStorage.getItem('authToken') 
            ? JSON.parse(localStorage.getItem('authToken'))
            : null
    })

    const [user, setUser] = useState(() => {
        localStorage.getItem('authToken')
            ? jwt_decode(localStorage.getItem('authToken'))
            : null
    })

    const [loading, setLoading] = useState(true)

    const history = useHistory()


    ////////////// METHODS //////////////
  
    const loginUser = async (email, password) => {
        const response = await fetch('http://127.0.0.1:8000/api/token/',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify({
                email, password
            })
        })

        const data = await response.json()
        console.log(data)

        if(response.status === 200){
            console.log('loggedIn')
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
            history.push('/')   // Redirect the user to home
        } else {
            alert("Something went wrong ! "+response.status)
        }
    }


    const registerUser = async (username, email, password, password2) => {
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify({
                username, email, password, password2
            })
        })

        const data = await response.json()

        if(data.status === 201){
            console.log("New user has been created!")
            history.push('/login')
        }
    }


    const logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        history.push('/login')
    }


    context_data = {
        user,
        setUser,
        authToken,
        setAuthToken,
        loginUser,
        registerUser,
        logoutUser,
    }


    useEffect(()=>{
        response = await fetch('http://127.0.0.1:8000/token/refresh/')
    },[loading])


    
}
