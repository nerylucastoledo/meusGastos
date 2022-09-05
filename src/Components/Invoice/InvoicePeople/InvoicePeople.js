import React from 'react'
import PropTypes from 'prop-types'

import styles from './InvoicePeople.module.css'

function InvoicePeople({ people, setNameFilter, color }) {
  return (
    <div
      className={styles.boxPeople}
      style={{ backgroundColor: color}}
      onClick={(({target}) => setNameFilter(target.innerText))}
      >
      <p>{people}</p>
    </div>
  )
}

export default InvoicePeople
InvoicePeople.propTypes = {
  people: PropTypes.string,
  setNameFilter: PropTypes.func,
  color: PropTypes.string,
}