import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/open-veezoo/editor',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

export default instance
