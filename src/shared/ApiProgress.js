import React, {useEffect, useState} from "react";
import axios from "axios";


//kendi hooksumuz
export const useApiProgress = (apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false)

    useEffect(() => {
        let requestInterceptor, responseInterceptor;

        const updateApiCallFor = (url, inProgress) => {
            // if (url.startsWith(apiPath)) {
            if (url === apiPath) {
                setPendingApiCall(inProgress);
            }
        }

        const registerInterceptors = () => {
            //request atıldığında yapılacak işlemler
            requestInterceptor = axios.interceptors.request.use((request) => {
                //console.log("running request interceptor", apiPath)
                // if(request.url === this.props.path){
                //     this.setState({ pendingApiCall: true });
                //}
                updateApiCallFor(request.url, true);
                return request;
            });

            //response döndüğünde yapılacak işlemler
            responseInterceptor = axios.interceptors.response.use(
                (response) => {
                    //if(response.config.url === this.props.path){
                    //    this.setState({ pendingApiCall: false });
                    //}
                    updateApiCallFor(response.config.url, false);
                    return response;
                },
                (error) => {
                    //if(error.config.url === this.props.path){
                    //  this.setState({ pendingApiCall: false });
                    //}
                    updateApiCallFor(error.config.url, false)
                    throw error;
                }
            );
        }
        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
        registerInterceptors();


        return function unmount() {
            unregisterInterceptors();
        }
    }, [])
    return pendingApiCall;
}

