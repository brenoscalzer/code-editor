import React, { useState, useEffect } from 'react'
import AceEditor from "react-ace";
import Sidebar from './components/sidebar'
import Footer from './components/footer'
import Header from './components/header'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "ace-builds/src-noconflict/mode-java";
import './app.css'

import { getFiles, getFile, deleteFile, saveFile } from './services/files'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {

  const [files, setFiles] = useState([])
  const [code, setCode] = useState('')
  const [openedFiles, setOpenedFiles] = useState([{ name: 'NewFile.java', id: -1, content: '' }])
  const [screenWidth, setScreenWidth] = useState()
  const [tab, setTab] = useState(0)
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [message, setMessage] = useState('')

  useEffect(() => {
    setScreenWidth(window.innerWidth)
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    });
    getFiles().then(res => {
      setFiles(res.data)
    }).catch(err => {
      setMessage('Error loading files')
      setErrorOpen(true)
    })
  }, [])

  const changeFile = (file, index, list) => {
    const fileList = list || openedFiles
    fileList[tab].content = code
    setOpenedFiles(fileList)
    setTab(index)
    setCode(file.content)
  }

  const openFile = (id) => {
    const opened = openedFiles.find(item => item.id === id)
    if (!opened) {
      getFile(id).then(res => {
        const fileList = [
          ...(openedFiles.length > 1 || openedFiles[0].id !== -1 ? openedFiles : []),
          { name: res.data.name, id, content: res.data.content }
        ]
        changeFile(res.data, fileList.length - 1, fileList)
      }).catch(err => {
        setMessage('Error opening your file')
        setErrorOpen(true)
      })
    } else {
      changeFile(opened, openedFiles.findIndex(item => item.id === id))
    }
  }

  const onDelete = async () => {
    try {
      await deleteFile(openedFiles[tab].id)
      const result = await getFiles()
      setFiles(result.data)
      setMessage('File deleted successfully')
      setSuccessOpen(true)
    } catch (e) {
      setMessage('Error deleting your file')
      setErrorOpen(true)
    }
  }

  const onSave = async () => {
    try {
      const file = openedFiles[tab]
      file.content = code
      await saveFile(file)
      setMessage('File saved successfully')
      setSuccessOpen(true)
    } catch (e) {
      setMessage('Error saving your file')
      setErrorOpen(true)
    }
  }

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
  };

  return (
    <div className="container">
      <Sidebar items={files} onSelect={openFile} />
      <div className="editor-container">
        <Header value={tab} handleChange={(event, index) => changeFile(openedFiles[index], index)} items={openedFiles} />
        <AceEditor
          mode="java"
          onChange={setCode}
          value={code}
          name="editor-div"
          editorProps={{ $blockScrolling: true, height: '100%' }}
        />
        <Footer width={screenWidth || 0} onCancel={onDelete} onConfirm={onSave} />
      </div>
      <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
