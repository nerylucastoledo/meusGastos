import React from "react"
import { fireEvent, render, screen } from '@testing-library/react'
import SignIn from "../SignIn"
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

describe('Testing SignIn component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <SignIn />
            </BrowserRouter>
        )
    })

    it('should be visible title Faça o login', () => {
        expect(screen.getByText('Faça o login')).toBeTruthy()
    })

    it('should be visible text of reset password', () => {
        expect(screen.getByText('Esqueceu a senha?')).toBeTruthy()
    })

    it('should be visible 2 inputs', () => {
        expect(screen.getByPlaceholderText('Seu e-mail')).toBeTruthy()
        expect(screen.getByPlaceholderText('Sua senha')).toBeTruthy()
    })

    it('when updating the inputs should change the value', () => {
        const inputEmail = screen.getByPlaceholderText('Seu e-mail')
        const inputPassword = screen.getByPlaceholderText('Sua senha')

        fireEvent.change(inputEmail, { target: { value: 'teste@hotmail.com' }})
        fireEvent.change(inputPassword, { target: { value: '12345' }})

        expect(inputEmail.value).toBe('teste@hotmail.com')
        expect(inputPassword.value).toBe("12345")
    })

    it('should be visibile button for login', () => {
        expect(screen.getByText('Entrar')).toBeTruthy()
    })

    it('button text should update when clicked', () => {
        const buttonElement = screen.getByText('Entrar')
        fireEvent.click(buttonElement)

        expect(buttonElement.innerHTML).toBe('Entrando...')
    })

    it('should be visible box for create new account', () => {
        expect(screen.getByText('Não possui conta?')).toBeTruthy()
        expect(screen.getByText('Cadastre-se')).toBeTruthy()
    })
})