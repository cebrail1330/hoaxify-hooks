import React, {useEffect, useState} from "react";
import axios from "axios";


//kendi hooksumuz
export const useApiProgress = (apiMethod, apiPath, strictPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false)

    useEffect(() => {
        let requestInterceptor, responseInterceptor;

        const updateApiCallFor = (method, url, inProgress) => {
            if (method !== apiMethod) {
                return;
            }
            if(strictPath && url===apiPath){
                setPendingApiCall(inProgress);
            }else if (!strictPath && url.startsWith(apiPath)) {
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
                const {url, method} = request; //url ve methodu alacak
                updateApiCallFor(method, url, true);
                return request;
            });

            //response döndüğünde yapılacak işlemler
            responseInterceptor = axios.interceptors.response.use(
                (response) => {
                    //if(response.config.url === this.props.path){
                    //    this.setState({ pendingApiCall: false });
                    //}
                    const {url, method} = response.config
                    updateApiCallFor(method, url, false);
                    return response;
                },
                (error) => {
                    //if(error.config.url === this.props.path){
                    //  this.setState({ pendingApiCall: false });
                    //}
                    const {url, method} = error.config
                    updateApiCallFor(method, url, false);
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
    }, [apiPath, apiMethod, strictPath]) //her path değiştiğinde tetiklenecek
    return pendingApiCall;
}

