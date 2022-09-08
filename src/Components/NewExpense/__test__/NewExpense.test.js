import React from "react"

import * as router from 'react-router'
import { fireEvent, render } from '@testing-library/react'

import NewExpense from '../NewExpense'
import { DatabaseContext } from "../../../DatabaseContext"

const navigate = jest.fn()
const date = 'setembro2022'
const cards = ['CardTest']
const peoples = ['PeopleTest']
const categorys = ['CategoryTest']
let container

describe('Testing NewExpense component', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

        const { container: wrapper } = render(
            <DatabaseContext.Provider value={{ date, cards, peoples, categorys }}>
                <NewExpense />
            </DatabaseContext.Provider>
        )
        container = wrapper
    })

    it('title must be visible', () => {
        const h1Element = container.getElementsByClassName('title')[0]
        expect(h1Element.innerHTML).toBe('Novo gasto')
    })

    it('amount of selects must be 3', () => {
        const select = container.getElementsByTagName('select')
        expect(select.length).toBe(3)
    })

    it('amount of inputs must be 3', () => {
        const input = container.getElementsByTagName('input')
        expect(input.length).toBe(3)
    })

    it('input newPeople should be visibile', () => {
        const select = container.getElementsByTagName('select')[1]

        expect(container.querySelector('#newPeople')).not.toBeTruthy()

        fireEvent.change(select, { target: { value: 'Nova' }})

        const inputLength = container.getElementsByTagName('input')
        expect(inputLength.length).toBe(4)
        expect(container.querySelector('#newPeople')).toBeTruthy()
    })

    it('input newCategory should be visibile', () => {
        const select = container.getElementsByTagName('select')[2]

        expect(container.querySelector('#newCategory')).not.toBeTruthy()

        fireEvent.change(select, { target: { value: 'Nova' }})

        const inputLength = container.getElementsByTagName('input')
        expect(inputLength.length).toBe(4)
        expect(container.querySelector('#newCategory')).toBeTruthy()
    })

    it('input cardInstallment should be visibile', () => {
        const input = container.getElementsByTagName('input')[1]

        expect(container.querySelector('#cardInstallment')).not.toBeTruthy()

        fireEvent.click(input)

        const inputsLength = container.getElementsByTagName('input')
        expect(inputsLength.length).toBe(4)
        expect(container.querySelector('#cardInstallment')).toBeTruthy()
    })

    it('update inputs values', () => {
        const inputItem = container.getElementsByTagName('input')[0]
        const inputCheckBox = container.getElementsByTagName('input')[1]
        const inputValue = container.getElementsByTagName('input')[2]

        fireEvent.change(inputItem, { target: { value: 'New Item' }})
        fireEvent.click(inputCheckBox)
        fireEvent.change(inputValue, { target: { value: 200 }})

        expect(inputItem.value).toBe('New Item')
        expect(inputCheckBox.checked).toBe(true)
        expect(inputValue.value).toBe("200")

        const cardInstallment = container.getElementsByTagName('input')[2]
        
        fireEvent.change(cardInstallment, { target: { value: 10 }})

        expect(cardInstallment.value).toBe('10')
    })

    it('update selects values', () => {
        const selectCard = container.getElementsByTagName('select')[0]
        const selectPeople = container.getElementsByTagName('select')[1]
        const selectCategory = container.getElementsByTagName('select')[2]

        fireEvent.change(selectCard, { target: { value: 'CardTest' }})
        fireEvent.change(selectPeople, { target: { value: 'Eu' }})
        fireEvent.change(selectCategory, { target: { value: 'CategoryTest' }})

        expect(selectCard.value).toBe('CardTest')
        expect(selectPeople.value).toBe('Eu')
        expect(selectCategory.value).toBe('CategoryTest')
    })

    it('render button coreectly', () => {
        const elementButton = container.getElementsByTagName('button')[0]
        expect(elementButton.innerHTML).toBe('Inserir gasto')
    })

    it('update text button when clicked', () => {
        const elementButton = container.getElementsByTagName('button')[0]
        expect(elementButton.innerHTML).toBe('Inserir gasto')
        
        fireEvent.click(elementButton)
        
        expect(elementButton.innerHTML).toBe('Inserindo...')
    })
})