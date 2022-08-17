import { ref, remove } from 'firebase/database'
import React from 'react'
import { useParams } from 'react-router-dom'
import { DatabaseContext } from '../../../DatabaseContext'
import { db } from '../../../firebase/firebaseConfig'
import styles from './InvoiceData.module.css'

function InvoiceData({ data, nameFilter }) {
  const params = useParams()
  const { date } = React.useContext(DatabaseContext)
  const displayName = localStorage.getItem('displayName')

  function handleClickRemove(item) {
    const url = `${displayName}/${date}/${params.card}/${nameFilter}/${item}`
    console.log(url)
    if (window.confirm('Quer realmente deletar?')) {
      remove(ref(db, url))
      .then(() => console.log('deu certo'))
    }
  }

  return (
    <div className={styles.eachInvoice}>
      {nameFilter &&  data[nameFilter] ? Object.keys(data[nameFilter]).map(item => 
        <div key={item} className={styles.dataInvoice}>
          <span>{item}</span>
          <span>R$ {data[nameFilter][item]['valor']}</span>
          <div className={styles.actions}>
            <p className={styles.edit}>E</p>
            <p className={styles.remove} onClick={() => handleClickRemove(item)}>X</p>
          </div>
        </div>
      ) : 
        <p>Nenhum dado disponível :!</p>
      }
    </div>
  )
}

export default InvoiceData