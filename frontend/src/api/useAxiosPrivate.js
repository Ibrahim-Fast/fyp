import { useContext, useEffect } from "react";
import  axios  from "./axios";
import useRefreshToken from "../hooks/useRefreshToken";
import { UserState } from "../context/UserState";

const useAxiosPrivate = () => {
    const { at } = useContext(UserState)
    const refresh = useRefreshToken()
    useEffect(() => {
        const request_interceptor = axios.interceptors.request.use(
            config => {
                // console.log('sent 2nd')
                if (!config.headers['Authorization']) {
                    // console.log('sent 1st')
                    // console.log(at)
                    config.headers['Authorization'] = `Bearer ${at}`
                }
                return config
            },
            (error) => {
                Promise.reject(error)
            }
        )

        const response_interceptor = axios.interceptors.response.use(
            response => response
            ,
            async (error) => {
                const prevRequest = error?.config;
                //                console.log('sent')
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    try {
                        console.log('retrying sending')
                        prevRequest.sent = true;
                        await refresh()
                        prevRequest.headers['Authorization'] = `Bearer ${at}`
                        return axios(prevRequest)
                    }
                    catch (err) {
                        console.log('something wrong with refreshing tokens')
                    }
                }
                return Promise.reject(error)
            }
        );
        return () => {
            axios.interceptors.request.eject(request_interceptor)
            axios.interceptors.response.eject(response_interceptor)
        }
    }, [refresh])
    return axios
}

export default useAxiosPrivate
