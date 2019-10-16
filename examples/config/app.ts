import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123
let data = qs.stringify({
  a: 1,
  b: new Date()
})
console.log(data)
axios({
  url: '/config/post',
  method: 'post',
  data,
  headers: {
    test: '321'
  }
}).then(res => {
  console.log(res.data)
})

axios({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ],
  url: '/config/post',
  method: 'post',
  data: {
    a: 'transformRequest'
  }
}).then(res => {
  console.log(res.data)
})

const instance = axios.create({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})
