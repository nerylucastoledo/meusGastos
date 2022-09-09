import React from "react"

import { fireEvent, render, screen } from '@testing-library/react'

import Header from "../Header"
import { BrowserRouter } from "react-router-dom"

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/"
    }),
    useNavigate: () => jest.fn(),
}))

jest.mock('firebase/auth', () => {
    return {
      getAuth: () => jest.fn(),
    }
})

describe('Testing render component Header', () => {
    let container
    beforeEach(() => {
        const { container: wrapper } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )
        container = wrapper
    })
    
    it('Logo should be visible', () => {
        expect(screen.getByRole('img')).toBeTruthy()
    })

    it('Nav should be contain button menu', () => {
        expect(container.getElementsByClassName('mobileButton')).toBeTruthy()
    })

    it('Nav should be contain Home, Inserir Gasto, Cadastrar Cartão, Empréstimos, Login', () => {
        expect(screen.getByText('Home')).toBeTruthy()
        expect(screen.getByText('Inserir Gasto')).toBeTruthy()
        expect(screen.getByText('Cadastrar Cartão')).toBeTruthy()
        expect(screen.getByText('Empréstimos')).toBeTruthy()
        expect(screen.getByText('Login')).toBeTruthy()
    })
})