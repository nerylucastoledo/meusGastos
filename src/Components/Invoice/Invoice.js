import React from 'react'

import { db } from '../../firebase/firebaseConfig';
import { onValue, ref } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { DatabaseContext } from '../../DatabaseContext';

import InvoicePeople from './InvoicePeople/InvoicePeople';
import InvoiceData from './InvoiceData/InvoiceData';
import ModalEdit from './ModalEdit/ModalEdit';

import styles from './Invoice.module.css'

function Invoice() {
  const { card } = useParams()
  const { date } = React.useContext(DatabaseContext)
  const displayName = localStorage.getItem('displayName')

  const [peoples, setPeoples] = React.useState([])
  const [listData, setListaData] = React.useState([])
  const [nameFilter, setNameFilter] = React.useState()
  const [openModal, setOpenModal] = React.useState(false)
  const [itemModal, setItemModal] = React.useState(false)
  const [categoryModal, setCategoryModal] = React.useState(false)
  const [valueModal, setValueModal] = React.useState(false)

  React.useEffect(() => {
    let peopleAux = peoples
    const database = ref(db, `${displayName}/${date}/${card}`)

    onValue(database, (snapshot) => {
      Object.keys(snapshot.val()).forEach(people => {
        setListaData(snapshot.val())
        if (people !== 'cor' && !peopleAux.includes(people)) {
          peopleAux.push(people)
        }
      })
    })
    setPeoples(peopleAux)
    if (!nameFilter) {
      setNameFilter(peopleAux[0])
    }

  }, [date, card, displayName, itemModal, categoryModal, valueModal, nameFilter, peoples])

  return (
    <div className='container'>
      <div className={styles.boxCard} style={{ backgroundColor: listData['cor']}}>
        <h1>{card}</h1>
      </div>

      <div className={`${styles.invoice} ${openModal && styles.active}`}>
        {openModal && 
          <div className={styles.modal}>
            <ModalEdit 
              item={itemModal}
              category={categoryModal}
              value={valueModal}
              setOpenModal={setOpenModal}
              nameFilter={nameFilter}
            />
          </div>
        }
        <div>
          {peoples.map(people => (
            <InvoicePeople 
              key={people} 
              people={people} 
              setNameFilter={setNameFilter} 
              color={listData['cor']}
            />  
          ))}
        </div>
        <div>
          <InvoiceData 
            data={listData} 
            nameFilter={nameFilter}
            setOpenModal={setOpenModal}
            setItemModal={setItemModal}
            setCategoryModal={setCategoryModal}
            setValueModal={setValueModal}
            active={openModal}
          />
        </div>
      </div>
    </div>
  )
}

export default Invoice