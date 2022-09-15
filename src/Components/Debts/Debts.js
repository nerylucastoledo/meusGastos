import React from 'react'

import { convert } from '../Helpers/index'
import { onValue, ref } from "firebase/database"
import { db } from "../../firebase/firebaseConfig"

import Button from '../Forms/Button'
import ModalNewEmprestimo from './ModalNewEmprestimo/ModalNewEmprestimo'
import ModalNewValue from './ModaNewValue/ModalNewValue'
import Loading from '../Loading/Loading'

import styles from './Debts.module.css'

function Debts() {
  document.title = 'Gastos | Novo empréstimo'
  const [openModal, setOpenModal] = React.useState(false)
  const [openModalNewValue, setOpenModalNewValue] = React.useState(false)
  const [nameEmprestimo, setNameEmprestimo] = React.useState(0)
  const [listEmprestimo, setListEmprestimos] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    let listAux = []
    let listAuxName = []
    setListEmprestimos([])

    const displayName = localStorage.getItem('displayName')
    const database = ref(db, `${displayName}/emprestimo`)

    onValue(database, (snapshot) => {
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).forEach(item => {
          let newItem = snapshot.val()[item]
          newItem['id'] = item
          if (!listAuxName.includes(newItem['nome'])) {
            listAuxName.push(newItem['nome'])
            listAux.push(newItem)
          }
        })
        setListEmprestimos(listAux)
      } else {
        setListEmprestimos([])
      }
    })
    setLoading(false)

  }, [openModal, openModalNewValue])

  function handleClick() {
    setOpenModal(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  function handleClickTwo(emprestimo) {
    setOpenModalNewValue(true)
    setNameEmprestimo(emprestimo)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <>
      {loading ?
        <Loading />
        :
        <>
          <h1 className='title'>Meus empréstimos</h1>
          {listEmprestimo.length ?
            <div
              className={`
                container 
                ${styles.boxDebt}} 
                ${openModal && styles.active}
                ${openModalNewValue && styles.active}`
              }
            >

              {openModal &&
                <div className={styles.modal}>
                  <ModalNewEmprestimo setOpenModal={setOpenModal} exists={listEmprestimo}/>
                </div>
              }

              {openModalNewValue &&
                <div className={styles.modal}>
                  <ModalNewValue
                    setOpenModalNewValue={setOpenModalNewValue}
                    nameEmprestimo={nameEmprestimo}
                  />
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

                  <Button
                    style={{backgroundColor: 'rgb(93, 182, 209)'}}
                    onClick={() => handleClickTwo(emprestimo)}
                    >
                    Inserir valor
                  </Button>
                </div>
              ))}

              <Button onClick={handleClick}>Cadastrar</Button>
            </div>
            :
            <div className={`container ${openModal && styles.active}`}>

              {openModal &&
                <div className={styles.modal}>
                  <ModalNewEmprestimo setOpenModal={setOpenModal} exists={listEmprestimo}/>
                </div>
              }

              <p className={styles.notFoundEmprestimos}>Você não fez nenhum empréstimo! :)</p>
              <Button onClick={handleClick}>Cadastrar</Button>
            </div>
          }
        </>
      }
    </>
  )
}

export default Debts