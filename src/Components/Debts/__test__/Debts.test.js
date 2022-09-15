import React from "react"
import { fireEvent, render, screen } from '@testing-library/react'
import Debts from "../Debts"

describe('Testing Debts component', () => {
    let container
    beforeEach(() => {
        const { container: wrapper } = render(<Debts />)
        container = wrapper
    })

    it('should be visible title Meus empréstimos', () => {
        expect(screen.getByText('Meus empréstimos')).toBeTruthy()
    })

    it('should be visible a message when list is empty', () => {
        expect(screen.getByText('Você não fez nenhum empréstimo! :)')).toBeTruthy()
    })

    it('should be visible a button when list is empty', () => {
        expect(container.getElementsByTagName('button')).toBeTruthy()
    })
})