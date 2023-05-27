import {Message, MessageBox} from "element-ui";
import index from "@/store";
import {getToken} from "@/utils/auth";
import axios from "axios";

axios.defaults.baseURL = '/api'
axios.defaults.headers['Content-Type'] = 'application/json';
const service = axios.create({
    // baseURL:'/api',
    timeout : 5000
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (index.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response =>{
        const resultData = response.data
        // console.log(resultData.data)
        if (resultData.code !== 200) {
            Message({
                message: resultData.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (resultData.code === 50008 || resultData.code === 50012 || resultData.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    index.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(resultData.message || 'Error'))
        } else {
            return resultData
        }
    },
    error => {
        console.log('error:'+error.message)
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service
