/*封装的能发ajax请求的函数, 向外暴露的其实就是axios
1  解决post请求携带参数的问题： 默认是json， 需要转换成urlencode格式
2  让请求成功的结果不再是response， 而是response.data的值
3  统一处理异常问题
*/

  import axios from 'axios'
  import qs from 'qs'
  import {message} from 'antd'

  //添加请求拦截器: 让post请求的请求体格式为urlencoded 格式 a=1&b2
  //在真正发请求前执行
  axios.interceptors.request.use(function(config){
    //得到请求方式和请求体数据
    const {method, data} = config
    //处理post请求，将data对象转换成query 参数格式字符串
    if(method.toLowerCase() ==='post' && typeof data==='object'){
      config.data = qs.stringify(data)
    }

    return config;
  })

  //添加响应拦截器
  //功能1：让请求成功的结果不再是response，， 而是response.data的值
  //在请求返回之后且在我们制定的请求回调函数之前
  axios.interceptors.response.use(function (response){
    return response.data //返回的结果就会交给我们指定的请求响应的回调函数
  }, function(error) { //统一处理所有的请求的异常错误
    message.error('请求出错' + error.message)
    //return Promise.reject(error);
    //返回一个pending状态的Promise，终端Promise链
    return new Promise (()=>{})
  })
  export default axios