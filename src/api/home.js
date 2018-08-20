import axios from 'axios'
import jsonp from './jsonp'

const commonParams = {
  param: 'jsonpCallback'
}

export function getData () {
  const url = 'https://mce.mogucdn.com/jsonp/multiget/3'
  const data = Object.assign({}, commonParams, {
    appPlat: 'm',
    pids: '12775,51822,122224,106930,117706,47224'
  })
  return jsonp(url, data)
}

export function getDataJrbpAndGoodsNav () {
  const url = 'http://mce.mogucdn.com/jsonp/multiget/3'
  const data = Object.assign({}, commonParams, {
    appPlat: 'pc',
    pids: '98662,109499,109520,109731,109753,110549,109779,110548,110547,109757,109793,109795,110563,110546,110544'
  })
  return jsonp(url, data)
}

// export function getGoodsChildNav () {
//   const url = 'http://mce.mogucdn.com/jsonp/multiget/3'
//   const data = Object.assign({}, commonParams, {
//     appPlat: 'p',
//     pids: '110449,109514,110466,110534,110479,110510'
//   })
//   return jsonp(url, data)
// }

export function getGoodList () {
  const url = '/api/getGoodList'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
