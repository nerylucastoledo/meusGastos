import React from "react"
import { fireEvent, render, screen } from '@testing-library/react'
import ModalNewEmprestimo from "../ModalNewEmprestimo"

describe('Testing ModalNewEmprestimo component', () => {
    let container
    beforeEach(() => {
        const { container: wrapper } = render(<ModalNewEmprestimo setOpenModal={() => {}} exists={[]} />)
        container = wrapper
    })
    
    it('should be visible 3 inputs', () => {
        expect(container.getElementsByTagName('input').length).toBe(3)
    })

    it('should be visible X for close modal', () => {
        expect(screen.getByText('X')).toBeTruthy()
    })

    it('should be visible input parcela if input checkbox checked', () => {
        const checkboxElement = screen.getByLabelText('Tem parcelas?')

        fireEvent.click(checkboxElement)
        expect(container.getElementsByTagName('input').length).toBe(4)
        expect(screen.getByPlaceholderText('Digite a quantidade')).toBeTruthy()
    })

    it('should be visibile button for create new debt', () => {
        expect(screen.getByText('Inserir')).toBeTruthy()
    })
})