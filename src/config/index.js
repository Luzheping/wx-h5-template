let env = process.env.NODE_ENV
let appid = ''
let url = ''
switch (env) {
  // 测试
  case 'development':
    // appid = 'wx9a8a8d1b51655d58'
    appid = 'wx9f77a26b8dcbcfa0'
    url =
      // 'http://52.82.81.239:8082/cysk/wx/url/get?returnUrl=http://192.168.31.207:8080'
      'http://xdy.e-whole.com/cysk/wx/url/get?returnUrl=http://192.168.31.207:8080'
    break
  // 生产
  case 'production':
    appid = 'wx9f77a26b8dcbcfa0'
    url =
      'http://xdy.e-whole.com/cysk/wx/url/get?returnUrl=http://personal.xdyfw.com'
    // 'http://xdy.e-whole.com/cysk/wx/url/get?returnUrl=http://192.168.31.207:8080'
    break
  // 开发
  default:
    // appid = 'wx9a8a8d1b51655d58'
    appid = 'wx9f77a26b8dcbcfa0'
    url =
      // 'http://52.82.81.239:8082/cysk/wx/url/get?returnUrl=http://192.168.31.207:8080'
      'http://xdy.e-whole.com/cysk/wx/url/get?returnUrl=http://192.168.31.207:8080'
    break
}
export default {
  appid,
  url
}
