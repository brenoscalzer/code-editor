import React, { useState, useEffect } from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import Sidebar from './components/sidebar'
import Footer from './components/footer'
import Header from './components/header'
import { getFiles, getFile } from './services/files'

import './app.css'

function App() {

  const [files, setFiles] = useState([])
  const [code, setCode] = useState('')
  const [openedFiles, setOpenedFiles] = useState([{ name: 'NewFile.java', id: -1, content: '' }])
  const [screenWidth, setScreenWidth] = useState()
  const [tab, setTab] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    });
    getFiles().then(res => {
      setFiles(res.data)
    }).catch(err => {
      alert('Error!', err.statusText)
    })
  }, [])

  const openFile = (id) => {
    const opened = openedFiles.find(item => item.id === id)
    if (!opened) {
      getFile(id).then(res => {
        setCode(res.data.content)
        const fileList = [
          ...openedFiles,
          { name: res.data.name, id, content: res.data.content }
        ]
        setOpenedFiles(fileList)
        setTab(fileList.length - 1)
      }).catch(err => {
        alert('Error!', err.statusText)
      })
    } else {
      console.log('hereee', opened)
      setTab(openedFiles.findIndex(item => item.id === id))
      setCode(opened.content)
    }
  }

  const handleTabChange = (event, index) => {
    setTab(index)
    setCode(openedFiles[index].content)
  }

  return (
    <div className="container">
      <Sidebar items={files} onSelect={openFile} />
      <div className="editor-container">
        <Header value={tab} handleChange={handleTabChange} items={openedFiles} />
        <AceEditor
          mode="java"
          onChange={setCode}
          value={code}
          name="editor-div"
          editorProps={{ $blockScrolling: true, height: '100%' }}
        />
        <Footer width={screenWidth || 0} />
      </div>
    </div>
  )
}

export default App
