import axios from '../../src/index'

let date = new Date()

axios({
  url: '/simple/get',
  params: {
    a: ['a', 'b'],
    date,
    b: 2
  }
})

axios({
  method: 'post',
  url: '/simple/post',
  data: {
    hyy: '123'
  }
}).then((res)=>{
    console.log(res)
})
