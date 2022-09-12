import React from "react"
import { fireEvent, render, screen } from '@testing-library/react'
import ModalNewValue from "../ModalNewValue"

const mockNameEmpresitmo = {
    "nome": 'Testing',
    "valorPago": 1000
}

describe('Testing ModalNewValue component', () => {
    let container
    beforeEach(() => {
        const { container: wrapper } = render(<ModalNewValue setOpenModalNewValue={() => {}} nameEmprestimo={mockNameEmpresitmo} />)
        container = wrapper
    })

    it('should be visible title Testing', () => {
        expect(screen.getByText('Testing')).toBeTruthy()
    })

    it('should be visible 1 input', () => {
        expect(container.getElementsByTagName('input').length).toBe(1)
    })

    it('should be visible X for close modal', () => {
        expect(screen.getByText('X')).toBeTruthy()
    })

    it('should be visibile button for send new value', () => {
        expect(screen.getByText('Enviar')).toBeTruthy()
    })
})