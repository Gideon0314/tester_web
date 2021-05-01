import request from '@/utils/request'

export default {
  test() {
    return request({
      url: '/ping',
      method: 'get'
    })
  },
  // eslint-disable-next-line no-dupe-keys
  test_pie() {
    return request({
      url: '/ping/pie',
      method: 'get'
    })
  },
  test_bar() {
    return request({
      url: '/ping/bar',
      method: 'get'
    })
  }
}
