import request from '@/utils/request'

export default {
  getList(query) {
    return request({
      url: '/task/list',
      method: 'get',
      params: query
    })
  },
  resumeTask() {
    return request({
      url: '/resume/task/:id(\\\\d+)',
      method: 'get'
    })
  },
  pauseTask() {
    return request({
      url: '/pause/task/:id(\\d+)',
      method: 'get',
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
