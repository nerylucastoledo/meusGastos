import React from 'react'

import { convert } from '../Helpers/index'
import { onValue, ref } from "firebase/database"
import { db } from "../../firebase/firebaseConfig"

import Button from '../Forms/Button'

import styles from './Debts.module.css'
import ModalEdit from './ModalEdit/ModalEdit'

function Debts() {

  const [openModal, setOpenModal] = React.useState(false)
  const [listEmprestimo, setListEmprestimos] = React.useState([])
  
  React.useEffect(() => {
    let listAux = []
    let listAuxName = []
    setListEmprestimos([])

    const displayName = localStorage.getItem('displayName')
    const database = ref(db, `${displayName}/emprestimo`)

    onValue(database, (snapshot) => {
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).forEach(item => {
          const newItem = snapshot.val()[item]
          if (!listAuxName.includes(newItem['nome'])) {
            listAuxName.push(newItem['nome'])
            listAux.push(newItem)
          }
        })
        setListEmprestimos(listAux)
      }
    })

  }, [openModal])

  function handleClick() {
    setOpenModal(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <>
      {listEmprestimo ?
        <div className={`container ${styles.boxDebt}} ${openModal && styles.active}`}>
          <h1 className='title'>Meus empréstimos</h1>
    
          {openModal && 
            <div className={styles.modal}>
              <ModalEdit setOpenModal={setOpenModal} exists={listEmprestimo}/>
            </div>
          }
    
          {listEmprestimo && listEmprestimo.map(emprestimo => (
            <div key={emprestimo['nome']} className={`${styles.debts}`}>
              <h1>{emprestimo['nome']}</h1>
              <div className={styles.values}>
                <p>Valor emprestado</p>
                <p>{convert(emprestimo['valor'])}</p>
              </div>
    
              {emprestimo['parcela'] && 
                <div className={styles.values}>
                  <p>Parcelas</p>
                  <p>{`${emprestimo['parcela']} x de ${convert(emprestimo['valor'] / emprestimo['parcela'])}`}</p>
                </div>
              }
    
              <div className={styles.values}>
                <p>Valor pago</p>
                <p>{convert(emprestimo.valorPago)}</p>
              </div>
    
              <Button style={{backgroundColor: 'rgb(93, 182, 209)'}}>Inserir valor</Button>
            </div>
          ))}
    
          <Button onClick={handleClick}>Novo</Button>
        </div>
        :
        <p>Oi</p>
      }
    </>
  )
}

export default Debts