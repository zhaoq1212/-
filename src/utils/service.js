import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
const service = axios.create({
    baseURL: "localhost:8080", // url = base url + request url
    timeout: 5000 // request timeout
})
service.interceptors.request.use(
    config => {
        console.log("这里是请求拦截")
        if (getToken()) {
            config.headers['token'] = getToken()
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
    response => {
        const res = response.data
        console.log("这里是响应拦截",response)
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
        })
        return Promise.reject(error)
    }
)
export default service