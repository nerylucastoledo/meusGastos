import React from 'react'

import { ref, update } from 'firebase/database'
import { db } from '../../../firebase/firebaseConfig'

import Input from '../../Forms/Input'
import Button from '../../Forms/Button'

import styles from './ModalNewEmprestimo.module.css'

function ModalNewEmprestimo({ setOpenModal, exists }) {

    const [nameDebt, setNameDebt] = React.useState('')
    const [valueDebt, setValueDebt] = React.useState(0)
    const [checked, setChecked] = React.useState('')
    const [valueParcelas, setValueParcelas] = React.useState(0)
    const displayName = localStorage.getItem('displayName')

  function submitEdit(event) {
    event.preventDefault()
    const id = Math.floor(Date.now() * Math.random()).toString(36)
    if (exists) {
      let body = {
        [id]: {
          nome: nameDebt,
          valor: Number(valueDebt),
          valorPago: 0,
        }
      }

      if (valueParcelas) body[id]['parcela'] = Number(valueParcelas)

      update(ref(db, `${displayName}/emprestimo`), body)
      .then(() => {
        setOpenModal(false)
      })

    } else {
      let body = {
        'emprestimo': {
          [id]: {
            nome: nameDebt,
            valor: valueDebt,
            valorPago: 0,
          }
        }
      }

      if (valueParcelas) body['emprestimo'][id]['parcela'] = Number(valueParcelas)

      update(ref(db, `${displayName}`), body)
      .then(() => {
        setOpenModal(false)
      })
    }
  }

  return (
    <form className={`form-login ${styles.ModalNewEmprestimo}`} onSubmit={submitEdit}>
        <p className={styles.remove} onClick={() => setOpenModal(false)}>
          X
        </p>
        <Input 
          type="text" 
          label="Nome do empréstimo" 
          required
          onChange={({ target }) => setNameDebt(target.value)}
        />
        <Input 
          type="number" 
          label="Valor emprestado" 
          required
          onChange={({ target }) => setValueDebt(target.value)}
        />

        <div className={styles.boxCheckbox}>
          <label>
            <input 
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            Tem parcelas?
          </label>
        </div>

        {checked &&
            <Input 
                type="number" 
                label="Quantidade de parcelas" 
                onChange={({ target }) => setValueParcelas(target.value)}
            />
        }

        <Button>Inserir</Button>
    </form>
  )
}

export default ModalNewEmprestimo