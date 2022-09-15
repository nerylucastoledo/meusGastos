import React from 'react'
import PropTypes from 'prop-types'

import { ref, update } from 'firebase/database'
import { db } from '../../../firebase/firebaseConfig'

import Input from '../../Forms/Input'
import Button from '../../Forms/Button'

import styles from './ModaNewValue.module.css'

function ModalNewValue({ setOpenModalNewValue, nameEmprestimo }) {
  const [value, setValue] = React.useState(0)
  const displayName = localStorage.getItem('displayName')

  function submitEdit(event) {
    event.preventDefault()

    const body = {
      valorPago: nameEmprestimo['valorPago'] + Number(value)
    }
    update(ref(db, `${displayName}/emprestimo/${nameEmprestimo['id']}`), body)
    .then(() => setOpenModalNewValue(false))
  }

  return (
    <form className={`form-login ${styles.modalEdit}`} onSubmit={submitEdit}>
      <h1 className={styles.title}>{nameEmprestimo['nome']}</h1>
      <p className={styles.remove} onClick={() => setOpenModalNewValue(false)}>
        X
      </p>

      <Input
        type="number"
        label="Pagar a quantia de"
        required
        onChange={({ target }) => setValue(target.value)}
      />

      <Button>Enviar</Button>
    </form>
  )
}

export default ModalNewValue

ModalNewValue.propTypes = {
  setOpenModalNewValue: PropTypes.func,
  nameEmprestimo: PropTypes.object,
}