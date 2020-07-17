import axios from 'axios'
import Vue from 'vue'
// import Cookies from 'js-cookie'
import { getdToken } from './utils'
import { isLocalDev } from '@/api/server'

axios.defaults.timeout = 30000
axios.defaults.baseURL = isLocalDev === true ? '' : process.env.VUE_APP_BASE_URL
// 接口白名单
const whiteList = ['/wx/auth/login', '/wx/url/get']
const isInWhiteList = function(url) {
  var flag = false
  whiteList.forEach(function(e, i) {
    if (url.indexOf(e) >= 0) {
      flag = true
    }
  })
  return flag
}
// loading 白名单
const loadingUrl = [
  '/order/queryorder',
  '/companyFiling/queryByCompanyNameOrBranchStructure',
  '/order/insuranceList',
  '/order/comopanyList'
]
const isloading = function(url) {
  var flag = false
  loadingUrl.forEach(function(e, i) {
    if (url.indexOf(e) >= 0) {
      flag = true
    }
  })
  return flag
}

// axios 配置
axios.defaults.timeout = 30000
axios.defaults.withCredentials = true
axios.interceptors.request.use(
  config => {
    if (!isInWhiteList(config.url)) {
      // 获取公共参数
      config.headers.token = getdToken()
    }
    if (!isloading(config.url)) {
      Vue.prototype.$globalToast.loading()
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    Vue.prototype.$globalToast.close()
    if (response.data.code !== 200) {
      Vue.prototype.$globalToast.warning({
        duration: 3000,
        message: response.data.msg
      })
    }
    return response.data
  },
  error => {
    console.dir(error)
    Vue.prototype.$globalToast.close()
    Vue.prototype.$globalToast.warning({
      message: '网络繁忙'
    })
    return Promise.reject(error)
  }
)

export default axios
