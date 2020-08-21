import React from 'react'
import Btn from '@material-ui/core/Button';

import './style.css'

function Button({ onClick, label, type }) {
  return (
    <Btn className="button" variant="contained" color={type}>
      {label}
    </Btn>
  )
}

export default Button
