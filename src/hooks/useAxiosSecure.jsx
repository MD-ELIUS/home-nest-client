import axios from "axios";
import { use, useEffect } from "react";
import { AuthContext } from "../provider/AuthContext";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'https://home-nest-api-server-chi.vercel.app'
})

const useAxiosSecure = () => {
    const {user,  signOutUser} = use(AuthContext) ;
    const navigate = useNavigate() ;

    useEffect(() => {

            // set token in the header for all the api call using axiosSecure hook

     // request interceptor
    const requestInterceptor = instance.interceptors.request.use((config) => {
        const token = user.accessToken ;
        if(token) {
             config.headers.authorization = `Bearer ${user.accessToken}`  
        }
    
        return config
    })


    // response interceptor
    const responseInterceptor = instance.interceptors.response.use(res => {
        return res ;
    },
    error => {
        console.log(error) ;
        const status = error.status ;
        if(status === 401 || status === 403) {
            console.log('log out the user for bad intention')
            signOutUser()
            .then(() => {
                //Navigate user to the log in page
                  navigate("/register")
            })
        }
    }
)

   return () => {
    instance.interceptors.request.eject(requestInterceptor)
    instance.interceptors.response.eject(responseInterceptor)
   }

    }, [user, navigate, signOutUser])

    // ✅ Return the configured axios instance
  return instance;
   
}

export default useAxiosSecure