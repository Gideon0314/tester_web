import request from '@/utils/request'

export default {
  getList(query) {
    return request({
      url: '/task/list',
      method: 'get',
      params: query
    })
  },
  createProject(data) {
    return request({
      url: '/task/add',
      method: 'post',
      data
    })
  },
  updateProject(data) {
    return request({
      url: '/task/update',
      method: 'post',
      data
    })
  },
  deleteProject(data) {
    return request({
      url: '/task/delete',
      method: 'delete',
      data
    })
  }
}
