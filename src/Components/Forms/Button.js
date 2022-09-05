import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.module.css'
function Button({ children, style = {}, ...props }) {
  return (
    <button
      className={styles.button}
      style={style}
      {...props}
      >
      {children}
    </button>
  )
}

export default Button
Button.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
}