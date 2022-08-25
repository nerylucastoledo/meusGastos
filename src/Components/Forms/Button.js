import React from 'react'
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