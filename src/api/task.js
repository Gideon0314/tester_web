import request from '@/utils/request'

export default {
  getList(query) {
    return request({
      url: '/task/list',
      method: 'get',
      params: query
    })
  },
  resumeTask(query) {
    return request({
      url: '/resume/task',
      method: 'get',
      params: query
    })
  },
  pauseTask(query) {
    return request({
      url: '/pause/task',
      method: 'get',
      params: query
    })
  },
  deleteTask(query) {
    return request({
      url: '/task/delete',
      method: 'delete',
      params: query
    })
  }
}
