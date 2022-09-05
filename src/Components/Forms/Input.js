import React from 'react'
import PropTypes from 'prop-types'
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
Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
}