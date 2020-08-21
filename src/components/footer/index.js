import React from 'react'
import Button from '../button'

import './style.css'

function Footer({ onConfirm, onCancel, width }) {
  return (
    <div className="footer" style={{ width: width - 300 }}>
      <Button label="Delete" type="secondary" onClick={onCancel} />
      <Button label="Save" type="primary" onClick={onConfirm} />
    </div>
  )
}

export default Footer
