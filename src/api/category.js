// import axios from 'axios'
import jsonp from './jsonp'

const commonParams = {
  param: 'jsonpCallback'
}

export function getData () {
  const url = 'https://mce.mogucdn.com/jsonp/multiget/3'
  const data = Object.assign({}, commonParams, {
    appPlat: 'm',
    pids: '117330'
  })
  return jsonp(url, data)
}

export function categoryMenu (pid) {
  const url = 'https://mce.mogucdn.com/jsonp/get/3'
  const data = Object.assign({}, commonParams, {
    appPlat: 'm',
    pid: pid
  })
  return jsonp(url, data)
}
