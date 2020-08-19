import api from '../api'

export function getFiles() {
  return api.get('/filetree')
}
