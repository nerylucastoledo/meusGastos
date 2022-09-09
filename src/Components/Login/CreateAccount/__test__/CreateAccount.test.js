import React from "react"
import { fireEvent, render, screen } from '@testing-library/react'
import CreateAccount from '../CreateAccount'
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

describe('Testing CreateAccount component', () => {
    let container
    beforeEach(() => {
        const { container: wrapper } = render(
            <BrowserRouter>
                <CreateAccount />
            </BrowserRouter>
        )
        container = wrapper
    })

    it('should be visibible a title Crie sua conta', () => {
        expect(screen.getByText('Crie sua conta')).toBeTruthy()
    })

    it('should be visible 4 inputs', () => {
        const inputs = container.getElementsByTagName('input')
        expect(inputs.length).toBe(4)
    })

    it('should be visible input e-mail', () => {
        const inputEmail = screen.getByPlaceholderText('Seu e-mail')
        expect(inputEmail).toBeTruthy()

        fireEvent.change(inputEmail, { target: { value: 'test@email.com' }})
        expect(inputEmail.value).toBe('test@email.com')
    })

    it('should be visible input user', () => {
        const inputUser = screen.getByPlaceholderText('Seu usuário')
        expect(inputUser).toBeTruthy()

        fireEvent.change(inputUser, { target: { value: 'usertest' }})
        expect(inputUser.value).toBe('usertest')
    })

    it('should be visible input password', () => {
        const inputPassword = screen.getByPlaceholderText('Sua senha')
        expect(inputPassword).toBeTruthy()

        fireEvent.change(inputPassword, { target: { value: '12345' }})
        expect(inputPassword.value).toBe('12345')
    })

    it('should be visible input repeat password', () => {
        const inputPasswordRepeat = screen.getByPlaceholderText('Digite novamente a senha')
        expect(inputPasswordRepeat).toBeTruthy()

        fireEvent.change(inputPasswordRepeat, { target: { value: '12345' }})
        expect(inputPasswordRepeat.value).toBe('12345')
    })

    it('should be visibile button for create', () => {
        expect(screen.getByText('Cadastrar')).toBeTruthy()
    })

    it('when updating the inputs should change the value', () => {
        const buttonElement = screen.getByText('Cadastrar')
        fireEvent.click(buttonElement)

        expect(buttonElement.innerHTML).toBe('Cadastrando...')
    })

    it('should be visible box for have a account', () => {
        expect(screen.getByText('Já tem uma conta?')).toBeTruthy()
        expect(screen.getByText('Faça o login')).toBeTruthy()
    })
})