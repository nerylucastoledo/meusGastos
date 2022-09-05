import React from 'react'
import PropTypes from 'prop-types'

import { db } from '../../../firebase/firebaseConfig'
import { ref, update } from 'firebase/database'
import { DatabaseContext } from '../../../DatabaseContext'
import { useParams } from 'react-router-dom'

import Input from '../../Forms/Input'
import Button from '../../Forms/Button'

import style from './ModalEdit.module.css'

function ModalEdit({ item, category, value, setOpenModal, nameFilter }) {
  const params = useParams()
  const { date } = React.useContext(DatabaseContext)
  const displayName = localStorage.getItem('displayName')

  const [editCategory, setEditCategory] = React.useState(category)
  const [editValue, setEditValue] = React.useState(value)

  function submitEdit(event) {
    // colocar notificacao
    event.preventDefault()
    const url = `${displayName}/${date}/${params.card}/${nameFilter}/${item}`
    const body = {
      categoria: editCategory,
      valor: parseFloat(editValue)
    }
    update(ref(db, url), body)
    .then(() => {
      setOpenModal(false)
    })
  }

  return (
    <form className={`form-login ${style.modalEdit}`} onSubmit={submitEdit}>
        <p className={style.remove} onClick={() => setOpenModal(false)}>
          X
        </p>
        <Input
          type="text"
          label="Item"
          value={item}
          disabled
          style={{ backgroundColor: '#eee'}}
        />
        <Input
          type="text"
          label="Categoria"
          value={editCategory}
          onChange={({ target }) => setEditCategory(target.value)}
        />
        <Input
          type="number"
          label="Valor"
          value={editValue}
          onChange={({ target }) => setEditValue(target.value)}
        />
        <Button>Atualizar Item</Button>
    </form>
  )
}

export default ModalEdit
ModalEdit.propTypes = {
  item: PropTypes.string,
  category: PropTypes.string,
  value: PropTypes.number,
  setOpenModal: PropTypes.func,
  nameFilter: PropTypes.string
}