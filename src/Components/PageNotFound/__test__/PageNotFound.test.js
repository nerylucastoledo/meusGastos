import React from "react"
import { render } from "@testing-library/react"
import PageNotFound from '../PageNotFound'

jest.mock('react-router-dom', () => ({
    Link: () => (jest.fn())
}))

describe('Testing component PageNotFound', () => {
    it('Title should be visible', () => {
        const { getByText } = render(<PageNotFound />)
        expect(getByText('Aonde você pensa que vai o_O')).toBeTruthy()
    })

    it('Subtitle should be visible', () => {
        const { getByText } = render(<PageNotFound />)
        expect(getByText('Essa página não existe :(')).toBeTruthy()
    })
})