import React from 'react'
import Button from '../button'

import './style.css'

function Footer({ onConfirm, onCancel, confirmText, cancelText, width }) {
  return (
    <div className="footer" style={{ width: width - 280 }}>
      <Button label="Delete" type="secondary" />
      <Button label="Save" type="primary" />
    </div>
  )
}

export default Footer
