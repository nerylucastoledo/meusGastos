import React from 'react'

import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebaseConfig'
import { onValue, ref, update } from 'firebase/database'
import { DatabaseContext } from '../../DatabaseContext'

import Button from '../Forms/Button'
import Input from '../Forms/Input'

import style from './NewExpense.module.css'

// const months = [
//     'janeiro', 
//     'fevereiro', 
//     'março', 
//     'abril', 
//     'maio', 
//     'junho', 
//     'julho', 
//     'agosto', 
//     'setembro', 
//     'outubro', 
//     'novembro', 
//     'dezembro'
// ]
// const years = ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']

function NewExpense() {
    const navigate = useNavigate()
    const { date, data, cards, peoples, categorys } = React.useContext(DatabaseContext)
    const displayName = localStorage.getItem('displayName')

    const [item, setItem] = React.useState('')
    const [value, setValue] = React.useState('')
    const [people, setPeople] = React.useState('')
    const [newPeople, setNewPeople] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [newCategory, setNewCategory] = React.useState('')
    const [card, setCard] = React.useState('')
    const [quantity, setQuantity] = React.useState('')
    const [checked, setChecked] = React.useState(false)

    function sendExpense(event) {
        event.preventDefault()
        const nameValidated = people === 'Nova' ? newPeople : people
        const categoryValidated = category === 'Nova' ? newCategory : category
        const urlBase = `${displayName}/${date}/${card}/${nameValidated}`
        if (quantity) console.log(quantity)
        const result = verifyExistsData(urlBase)
        if (result) {
            const body = {
                [item]: {
                    valor: Number(value),
                    categoria: categoryValidated
                }
            }
            update(ref(db, urlBase), body)
            .then(() => navigate('/'))
        } else {
            saveDataToCard(nameValidated, categoryValidated)
        }
    }

    function saveDataToCard(nameValidated, categoryValidated) {
        const url = `${displayName}/${date}/${card}`
        const result = verifyExistsData(url)
        if (result) {
            const body = {
                [nameValidated]: {
                    [item]: {
                        valor: Number(value),
                        categoria: categoryValidated
                    }
                }
            }
            update(ref(db, url), body)
            .then(() => navigate('/'))
        } else {
            saveDataToDate(nameValidated, categoryValidated)
        }
    }

    function saveDataToDate(nameValidated, categoryValidated) {
        const cor = data[card]['cor']
        const url = `${displayName}/${date}`
        const result = verifyExistsData(url)
        if (result) {
            const body = {
                [card]: {
                    [nameValidated]: {
                        [item]: {
                            valor: Number(value),
                            categoria: categoryValidated
                        }
                    },
                    cor: cor
                }
            }
            update(ref(db, url), body)
            .then(() => navigate('/'))
        }
    }

    function verifyExistsData(url) {
        let result
        const database = ref(db, url)
        onValue(database, (snapshot => result = snapshot.exists()))
        return result
    }

  return (
    <div className='container'>
        <h1 className='title'>Novo gasto</h1>
        <form className='form-login' onSubmit={sendExpense}>

            <label>Cartão</label>
            <select defaultValue="" required onChange={({ target }) => setCard(target.value)}>
                <option value="" disabled>Seleciona o cartão</option>
                {cards.map(card => 
                    <option key={card} value={card}>{card}</option>
                )}
            </select>

            <Input
                type="text"
                id="item"
                label="Item"
                placeholder="O que?"
                required
                onChange={({ target }) => setItem(target.value)}
            />
            
            <label>Pessoa</label>
            <select defaultValue="" required onChange={({ target }) => setPeople(target.value)}>
                <option value="" disabled>Seleciona a pessoa</option>
                <option value="Nova">Nova pessoa</option>
                {peoples.map(people => 
                    <option key={people} value={people}>{people}</option>
                )}
            </select>

            {people === 'Nova' &&
                <Input
                    type="text"
                    id="newPeople"
                    label="Nome da pessoa"
                    placeholder="Qual o nome?"
                    required
                    onChange={({ target }) => setNewPeople(target.value)}
                />
            }

            <label>Categoria</label>
            <select defaultValue="" required onChange={({ target }) => setCategory(target.value)}>
                <option value="" disabled>Seleciona a categoria</option>
                <option value="Nova">Nova categoria</option>
                {categorys.map(category => 
                    <option key={category} value={category}>{category}</option>
                )}
            </select>

            {category === 'Nova' &&
                <Input
                    type="text"
                    id="newCategory"
                    label="Nome da categoria"
                    placeholder="Qual a categoria?"
                    required
                    onChange={({ target }) => setNewCategory(target.value)}
                />
            }
            
            <div className={style.boxCheckbox}>
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
                    id="quantity"
                    label="Quantidade"
                    placeholder="Quantas parcelas?"
                    required
                    onChange={({ target }) => setQuantity(target.value)}
                />
            }

            <Input
                type="number"
                id="valor"
                label="Valor"
                placeholder="Qual o valor?"
                required
                onChange={({ target }) => setValue(target.value)}
            />

            <Button>Inserir gasto</Button>
        </form>
    </div>
  )
}

export default NewExpense