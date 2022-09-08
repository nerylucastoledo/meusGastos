import React from "react"

import * as router from 'react-router'
import { fireEvent, render, screen } from '@testing-library/react'

import NewCard from "../NewCard"
import { DatabaseContext } from "../../../DatabaseContext"

const navigate = jest.fn()
const date = 'setembro2022'

describe('Testing NewCard component', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
        
        render(
            <DatabaseContext.Provider value={{ date }}>
                <NewCard />
            </DatabaseContext.Provider>
        )
    })

    it('should show name and color input', () => {
        expect(screen.getByLabelText('Cor do cartão')).toBeTruthy()
        expect(screen.getByLabelText('Nome do cartão')).toBeTruthy()
    })

    it('the register button should appear', () => {
        expect(screen.getByText('Cadastrar')).toBeTruthy()
    })

    it('should update values ​​when changed', () => {
        const { container: wrapper } = render(
            <DatabaseContext.Provider value={{ date }}>
                <NewCard />
            </DatabaseContext.Provider>
        )

        const colorInput = wrapper.getElementsByTagName('input')[0]
        const nameInput = wrapper.getElementsByTagName('input')[1]
        fireEvent.change(colorInput, { target: { value: '#000000' }})
        fireEvent.change(nameInput, { target: { value: 'TestCard' }})

        expect(colorInput.value).toBe('#000000')
        expect(nameInput.value).toBe('TestCard')
    })
})