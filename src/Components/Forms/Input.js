import React from 'react'

function Input({ label, id, type, ...props }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input 
        type={type}
        id={id}
        name={id}
        {...props}
      />
    </>
  )
}

export default Input