import React from "react"

import * as router from 'react-router'
import { fireEvent, render } from '@testing-library/react'

import NewCard from "../NewCard"
import { DatabaseContext } from "../../../DatabaseContext"

const navigate = jest.fn()
const date = 'setembro2022'

describe('Testing NewCard component', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    it('should show name and color input', () => {
        const { getByLabelText } = render(
            <DatabaseContext.Provider value={{ date }}>
                <NewCard />
            </DatabaseContext.Provider>
        )

        expect(getByLabelText('Cor do cartão')).toBeTruthy()
        expect(getByLabelText('Nome do cartão')).toBeTruthy()
    })

    it('the register button should appear', () => {
        const { getByText } = render(
            <DatabaseContext.Provider value={{ date }}>
                <NewCard />
            </DatabaseContext.Provider>
        )

        expect(getByText('Cadastrar')).toBeTruthy()
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