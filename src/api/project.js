import request from '@/utils/request'

export default {
  getList(query) {
    return request({
      url: '/project/list',
      method: 'get',
      params: query
    })
  },
  createProject(data) {
    return request({
      url: '/project/add',
      method: 'post',
      data
    })
  },
  updateProject(data) {
    return request({
      url: '/project/update',
      method: 'post',
      data
    })
  },
  deleteProject(data) {
    return request({
      url: '/project/delete',
      method: 'delete',
      data
    })
  }
}

export function getProjectApiDocs(data) {
  return request({
    url: '/project/get_api_docs',
    method: 'post',
    data,
    timeout: 10000
  })
}
