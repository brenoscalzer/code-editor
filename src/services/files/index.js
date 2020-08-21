import api from '../api'

export function getFiles() {
  return api.get('/filetree')
}

export function getFile(id) {
  return api.get(`/files/${id}`)
}
