import { onValue, ref } from 'firebase/database';
import React from 'react'
import { useParams } from 'react-router-dom';
import { DatabaseContext } from '../../DatabaseContext';
import { db } from '../../firebase/firebaseConfig';
import InvoicePeople from './InvoicePeople/InvoicePeople';

import styles from './Invoice.module.css'
import InvoiceData from './InvoiceData/InvoiceData';

function Invoice() {
  const { card } = useParams()
  const { date } = React.useContext(DatabaseContext)
  const [peoples, setPeoples] = React.useState([])
  const [listData, setListaData] = React.useState([])
  const [nameFilter, setNameFilter] = React.useState()
  const displayName = localStorage.getItem('displayName')

  React.useEffect(() => {
    let peopleAux = peoples

    const database = ref(db, `${displayName}/${date}/${card}`)
    onValue(database, (snapshot) => {
      Object.keys(snapshot.val()).forEach(people => {
        setListaData(snapshot.val())
        if (people !== 'cor' && !peopleAux.includes(people)) {
          peopleAux.push(people)
          if (!nameFilter) setNameFilter(people)
        }
      })
    })
    setPeoples(peopleAux)
  }, [date, card, displayName])

  return (
    <div className='container'>
      <div className={styles.boxCard} style={{ backgroundColor: listData['cor']}}>
        <h1>{card}</h1>
      </div>

      <div className={styles.invoice}>
        <div>
          {peoples.map(people => (
            <InvoicePeople key={people} people={people} setNameFilter={setNameFilter} color={listData['cor']}/>  
          ))}
        </div>
        <div>
          <InvoiceData data={listData} nameFilter={nameFilter}/>
        </div>
      </div>
    </div>
  )
}

export default Invoice