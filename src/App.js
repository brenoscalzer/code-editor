import React, { useState, useEffect } from 'react'
import Sidebar from './components/sidebar'
import { getFiles } from './services/files'

function App() {

  const [files, setFiles] = useState([])

  useEffect(() => {
    getFiles().then(res => {
      setFiles(res.data)
    }).catch(err => {
      alert('Error!', err.statusText)
    })
  }, [])

  return (
    <div>
      <Sidebar items={files} />
    </div>
  )
}

export default App
