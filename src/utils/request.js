import axios from 'axios'
import router from "@/router";
import ElementUI from 'element-ui'
import {serverIp} from "../../public/config";

const request = axios.create({
	baseURL: `http://${serverIp}:9090`,// 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
	timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
	
	let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
	let student_user = localStorage.getItem("student_user") ? JSON.parse(localStorage.getItem("student_user")) : null
	    if (user&&student_user==null) {
	        config.headers['token'] = user.token;  // 设置请求头
	    }
		else if(user==null&&student_user)
		{
			config.headers['token'] = student_user.token;  // 设置请求头
		}
		
  
 // config.headers['token'] = user.token;  // 设置请求头
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
		// 当权限验证不通过的时候给出提示
		if (res.code === '401') {
			router.push("/404")
		    ElementUI.Message({
		        message: res.msg,
		        type: 'error'
		    });
		}
        return res;
    },
    error => {
		ElementUI.Message({
		    message: error,
		    type: 'error'
		});
        return Promise.reject(error)
    }
)


export default request

