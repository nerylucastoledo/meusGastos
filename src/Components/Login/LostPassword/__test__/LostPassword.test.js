import React from "react"
import { fireEvent, render, screen } from '@testing-library/react'
import LostPassword from '../LostPassword'
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

describe('Testing LostPassword component', () => {
    let container
    beforeEach(() => {
        const { container: wrapper } = render(
            <BrowserRouter>
                <LostPassword />
            </BrowserRouter>
        )
        container = wrapper
    })

    it('should be visibible title Resetar senha', () => {
        expect(screen.getByText('Resetar senha')).toBeTruthy()
    })

    it('should be visible 1 input', () => {
        const inputs = container.getElementsByTagName('input')
        expect(inputs.length).toBe(1)
    })

    it('should be visible input e-mail', () => {
        const inputEmail = screen.getByPlaceholderText('Seu e-mail')
        expect(inputEmail).toBeTruthy()

        fireEvent.change(inputEmail, { target: { value: 'test@email.com' }})
        expect(inputEmail.value).toBe('test@email.com')
    })

    it('button text should update when clicked', () => {
        const buttonElement = screen.getByText('Enviar')
        fireEvent.click(buttonElement)

        expect(buttonElement.innerHTML).toBe('Enviando...')
    })

    it('should be visible box for have a account', () => {
        expect(screen.getByText('Faça o login')).toBeTruthy()
        expect(screen.getByText('Acessar conta')).toBeTruthy()
    })
})