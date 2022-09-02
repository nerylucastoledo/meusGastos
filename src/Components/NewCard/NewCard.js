import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'

import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebaseConfig'
import { onValue, ref, update } from 'firebase/database'
import {DatabaseContext} from '../../DatabaseContext' 

import style from './NewCard.module.css'

function NewCard() {
    document.title = 'Gastos | Cadastrar cartão'
    
    const navigate = useNavigate()
    const { date } = React.useContext(DatabaseContext)
    const displayName = localStorage.getItem('displayName')

    const [colorCard, setColorCard] = React.useState('')
    const [nameCard, setNameCard] = React.useState('')

    function newCard(event) {
        event.preventDefault()
        const url = `${displayName}/${date}/`
        const body = {
            [nameCard]: {
                cor: colorCard
            }
        }

        const database = ref(db, `${url}/${nameCard}`)
        onValue(database, (snapshot) => {
            if (!snapshot.exists()) {
                update(ref(db, url), body)
                .then(() => navigate('/'))
            }
        })
    }

  return (
    <div className={`container ${style.newCard}`}>
        <h1 className='title'>Novo cartão</h1>
        <form className='form-login' onSubmit={newCard}>
            <div className={style.colorCard}>
                <Input 
                    type="color"
                    label="Cor do cartão"
                    id="colorCard"
                    required
                    onChange={({ target }) => setColorCard(target.value)}
                />

                {colorCard &&
                    <div 
                        className={style.boxColor}
                        style={{backgroundColor: colorCard}}
                        >
                    </div>
                }
            </div>  
            
            <Input 
                type="text"
                label="Nome do cartão"
                id="nameCard"
                required
                placeholder="Qual o nome?"
                onChange={({ target }) => setNameCard(target.value)}
            />    
            <Button>Cadastrar</Button>
        </form>
    </div>
  )
}

export default NewCard