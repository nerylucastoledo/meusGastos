import React from 'react'

import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebaseConfig'
import { onValue, ref, update } from 'firebase/database'
import { DatabaseContext } from '../../DatabaseContext'

import Button from '../Forms/Button'
import Input from '../Forms/Input'

import style from './NewExpense.module.css'

const months = [
    'janeiro', 
    'fevereiro', 
    'março', 
    'abril', 
    'maio', 
    'junho', 
    'julho', 
    'agosto', 
    'setembro', 
    'outubro', 
    'novembro', 
    'dezembro'
]

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
    const [cardInstallment, setCardInstallment] = React.useState('')
    const [checked, setChecked] = React.useState(false)

    function sendExpense(event) {
        event.preventDefault()

        const nameValidated = people === 'Nova' ? newPeople : people
        const categoryValidated = category === 'Nova' ? newCategory : category

        if (checked && cardInstallment > 1) {
            for (let index = 0; index < cardInstallment; index++) {
                var numberOfMonths = 11
                var [currentMonth, currentYear] = date.split(20)
                var indexOfMonth = months.indexOf(currentMonth) + index

                if (indexOfMonth > numberOfMonths) {
                    currentYear = parseInt(currentYear) + 1
                    indexOfMonth = (indexOfMonth - 1) - numberOfMonths
                }

                var nameItem = `${item} ${index + 1}-${cardInstallment}`
                var month = `${months[indexOfMonth]}20${currentYear}`

                saveDataWithCardAndPeople(nameItem, nameValidated, categoryValidated, month)
            }
        } else {
            saveDataWithCardAndPeople(item, nameValidated, categoryValidated, date)
        }
    }

    function saveDataWithCardAndPeople(nameItem, namePeople, nameCategory, month) {
        const url = `${displayName}/${month}/${card}/${namePeople}`
        const body = {
            [nameItem]: {
                valor: Number(value),
                categoria: nameCategory
            }
        }
        const result = verifyExistsData(url)
        result ? saveDataOnDatabase(url, body) : saveDataWithCard(nameItem, namePeople, nameCategory, month)
    }

    function saveDataWithCard(nameItem, namePeople, nameCategory, month) {
        const url = `${displayName}/${month}/${card}`
        const body = {
            [namePeople]: {
                [nameItem]: {
                    valor: Number(value),
                    categoria: nameCategory
                }
            }
        }
        const result = verifyExistsData(url)
        result ? saveDataOnDatabase(url, body) : saveDataToNeWCard(nameItem, namePeople, nameCategory, month)
    }

    function saveDataToNeWCard(nameItem, namePeople, nameCategory, month) {
        const url = `${displayName}/${month}`
        const cor = data[card]['cor']
        const body = {
            [card]: {
                [namePeople]: {
                    [nameItem]: {
                        valor: Number(value),
                        categoria: nameCategory
                    }
                },
                cor: cor
            }
        }
        saveDataOnDatabase(url, body)
    }

    function verifyExistsData(url) {
        let result
        const database = ref(db, url)
        onValue(database, (snapshot => result = snapshot.exists()))
        return result
    }

    async function saveDataOnDatabase(url, body) {
        await update(ref(db, url), body)
        .then(() => navigate('/'))
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
                    id="cardInstallment"
                    label="Quantidade"
                    placeholder="Quantas parcelas?"
                    required
                    onChange={({ target }) => setCardInstallment(target.value)}
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