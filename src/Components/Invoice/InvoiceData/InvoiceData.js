import { ref, remove } from 'firebase/database'
import React from 'react'
import { useParams } from 'react-router-dom'
import { DatabaseContext } from '../../../DatabaseContext'
import { db } from '../../../firebase/firebaseConfig'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import styles from './InvoiceData.module.css'
import { convert } from '../../Helpers'

function InvoiceData({ data, nameFilter, setOpenModal, setItemModal, setCategoryModal, setValueModal, active }) {
  const params = useParams()
  const { date } = React.useContext(DatabaseContext)
  const displayName = localStorage.getItem('displayName')

  const [total, setTotal] = React.useState(0)

  React.useEffect(() => {
    setTotal(0)
    if (data && nameFilter && data[nameFilter]) {
      Object.keys(data[nameFilter]).forEach(item => {
        const valor = data[nameFilter][item]['valor']
        setTotal((last) => last + valor)
      })
    }
  }, [data, nameFilter, total])

  function handleClickRemove(item) {
    const url = `${displayName}/${date}/${params.card}/${nameFilter}/${item}`

    if (window.confirm('Quer realmente deletar?')) {
      // colocar notificacao
      remove(ref(db, url))
      .then(() => setTotal(0))
    }
  }

  function handleClickEdit(item, category, value) {
    setOpenModal(true)
    setItemModal(item)
    setCategoryModal(category)
    setValueModal(value)
  }

  return (
    <div className={styles.eachInvoice}>
      {nameFilter && data[nameFilter] && total ? 
        Object.keys(data[nameFilter]).map(item => 
          <div 
            key={item} 
            className={`${active && styles.active} ${styles.dataInvoice}`}
            >
            <span className={styles.item}>{item}</span>
            <span className={styles.value}>{convert(data[nameFilter][item]['valor'])}</span>

            <div className={`${styles.actions} ${active && styles.active} `}>
              <p 
                className={styles.edit} 
                onClick={() => handleClickEdit(
                  item, 
                  data[nameFilter][item]['categoria'], 
                  data[nameFilter][item]['valor']
                )}
                >
                <FaEdit color='#0095D9' size='16px'/>
              </p>
              <p onClick={() => handleClickRemove(item)}>
                <FaTrashAlt color='#E53935' size='16px'/>
              </p>
            </div>
          </div>
        ) : 
        <p style={{ textAlign: 'center', marginTop: '10px'}}>
          Nenhum dado disponível :(
        </p>
      }

      <div className={styles.totalInvoiceUser}>
        <p>Total: {convert(total)}</p>
      </div>
    </div>
  )
}

export default InvoiceData