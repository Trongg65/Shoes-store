import axios from "axios";
import NProgress from "nprogress";
NProgress.configure({
    showSpinner: false,
    // easing: 'ease',
    // speed: 500,
    // trickleRate: 0.5,
    // easing: 'ease',
    // speed: 200,
    // trickle: true,
    // trickleRate: 0.02,
    trickleSpeed: 100,
})

const instance = axios.create({
    baseURL: "http://127.0.0.1:8001/",
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    NProgress.done();

    //token expired: EC === -999
    if (error.response.data && error.response.data.EC === -999) {
        window.location.href = '/login'
    }


    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
        ? error.response.data : Promise.reject(error);
});

export default instance;