import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import bus from '@/libs/bus'
import 'lib-flexible/flexible'
import 'reset-css/reset.css'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
import { myInput, globalToast } from './components/index'
import filter from '@/libs/filter' // 过滤
import '@/assets/css/common.less'
import moment from 'moment'
import FastClick from 'fastclick'
import { getToken } from './libs/cy'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

if ('addEventListener' in document && 'ontouchstart' in window) {
  FastClick.prototype.focus = function (targetElement) {
    targetElement.focus()
  }
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.use(mandMobile)
Vue.use(globalToast)
Vue.use(filter)
Vue.use(MintUI)

Vue.component('my-input', myInput) // 公共input

Vue.config.productionTip = false
Vue.prototype.$Bus = bus
Vue.prototype.moment = moment

// getToken(function () {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
// })
