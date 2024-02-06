 import axios from 'axios'
 import { jwtDecode } from 'jwt-decode'
 import dayjs from 'dayjs'
 import { useContext } from 'react'
 import AuthContext from '../context/AuthContext'


 const baseURL = 'http://127.0.0.1:8000/api' 

 const UseAxios = () => {
    const {authToken, setUser, setAuthToken} = useContext(AuthContext)

    // axiosInstance will be used in every request to the backend
    const axiosInstance = axios.create({
        baseURL, 
        headers: {Authorization: `Bearer ${authToken?.access}`}
    })

    
    // Interceptor
    axiosInstance.interceptors.request.use(async req => {
        const user = jwtDecode(authToken.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
        // 'user.exp' is a value inside the access token determines wether the token expired or not.

        if(!isExpired) return req

        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: authToken.refresh
        });

        // Reset the variables
        localStorage.setItem('authToken', JSON.stringify(response.data))
        setAuthToken(response.data);
        setUser(jwtDecode(response.data.access))
        console.log('Token Has been Refreshed')
        
        req.headers.Authorization = `Bearer ${response.data.access}`
        
        return req
    })

    return axiosInstance
 }

 export default UseAxios