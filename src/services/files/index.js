import api from '../api'

export function getFiles() {
  return api.get('/filetree')
}

export function getFile(id) {
  return api.get(`/files/${id}`)
}

export function deleteFile(id) {
  return api.delete(`/files/${id}`)
}

export function saveFile(file) {
  return api.put(`/files/${file.id}`, file)
}
