// 首页
import axios from '@/libs/http'
// import { BXFQ } from '@/api/server'
let api = ''

export const queryStatistical = params => {
  return axios.request({
    url: api + '/user/statistical',
    method: 'get',
    params
  })
}

export const getUserInfo = params => {
  return axios.request({
    url: api + '/user/get/user',
    method: 'get',
    params
  })
}

export const querySendSms = params => {
  return axios.request({
    url: api + '/common/sendSms',
    method: 'get',
    params
  })
}

export const postSave = params => {
  return axios.request({
    url: api + '/user/order/save',
    method: 'post',
    data: params
  })
}

export const productListIndex = params => {
  return axios.request({
    url: api + '/finance/product/list',
    method: 'post',
    data: params
  })
}
