import React from "react"
import { fireEvent, render } from '@testing-library/react'
import Button from "../Button"

describe('Component rendering correctly', () => {
    it("Button should be text 'Inserir'", () => {
        const { getByText } = render(<Button children={'Inserir'} />)

        expect(getByText('Inserir')).toBeTruthy()
    })

    it("should call a function when clicked", () => {
        const testFunction = jest.fn()
        const { container: wrapper } = render(<Button children={'Inserir'} onClick={testFunction} />)
        const button = wrapper.getElementsByClassName('button')[0]

        fireEvent.click(button)
        expect(testFunction).toBeCalled()
    })
})