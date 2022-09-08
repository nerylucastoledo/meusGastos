import React from "react"
import { fireEvent, render } from '@testing-library/react'
import Input from "../Input"

describe('Component rendering correctly', () => {
    it('should be with label', () => {
        const { getByText } = render(<Input label={"TestLabel"}/>)
        expect(getByText('TestLabel')).toBeTruthy()
    })

    it('shuld be input with a default value', () => {
        const { container: wrapper } = render(<Input label={"TestLabel"} value='Testing'/>)
        
        const inputElement = wrapper.getElementsByTagName('input')[0]
        expect(inputElement.value).toBe('Testing')
    })

    it('should update the value', () => {
        const { container: wrapper } = render(<Input label={"TestLabel"}/>)
        const inputElement = wrapper.getElementsByTagName('input')[0]

        fireEvent.change(inputElement, {target: {value: 'New value'}})
        expect(inputElement.value).toBe('New value')
    })
})