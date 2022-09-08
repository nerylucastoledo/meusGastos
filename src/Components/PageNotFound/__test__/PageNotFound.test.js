import React from "react"
import { render, screen } from "@testing-library/react"
import PageNotFound from '../PageNotFound'

jest.mock('react-router-dom', () => ({
    Link: () => (jest.fn())
}))

describe('Testing component PageNotFound', () => {
    beforeEach(() => {
        render(<PageNotFound />)
    })
    it('Title should be visible', () => {
        expect(screen.getByText('Aonde você pensa que vai o_O')).toBeTruthy()
    })

    it('Subtitle should be visible', () => {
        expect(screen.getByText('Essa página não existe :(')).toBeTruthy()
    })
})