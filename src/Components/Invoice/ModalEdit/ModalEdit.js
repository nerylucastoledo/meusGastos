import React from 'react'
import Input from '../../Forms/Input'
import Button from '../../Forms/Button'
import styles from '../../Login/CreateAccount/CreateAccount.module.css'
import style from './ModalEdit.module.css'
import { ref, update } from 'firebase/database'
import { db } from '../../../firebase/firebaseConfig'
import { DatabaseContext } from '../../../DatabaseContext'
import { useParams } from 'react-router-dom'

function ModalEdit({ item, category, value, setOpenModal, nameFilter }) {
  const params = useParams()
  const { date } = React.useContext(DatabaseContext)
  const displayName = localStorage.getItem('displayName')
  
  const [editCategory, setEditCategory] = React.useState(category)
  const [editValue, setEditValue] = React.useState(value)

  function submitEdit(event) {
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
    <form className={`${styles.formLogin} ${style.modalEdit}`} onSubmit={submitEdit}>
        <p className={style.remove} onClick={() => setOpenModal(false)}>
          X
        </p>
        <Input 
          type="text" 
          label="Item" 
          value={item} 
          disabled
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