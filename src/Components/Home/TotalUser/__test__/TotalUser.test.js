import React from 'react'
import { render } from '@testing-library/react'

import TotalUser from '../TotalUser'

const mockData = {
    "CardTest": {
        "Eu": {
            "Item test 1": {
                "categoria": "Test",
                "valor": 100
            },
            "Item test 2": {
                "categoria": "Test",
                "valor": 100.5
            },
            "Item test 3": {
                "categoria": "Test",
                "valor": 1000.5
            },
        },
        "cor": "#1c00f0"
    }
}

describe('Testing render component', () => {
    it('render correctly and show select', () => {
        const { container: wrapper } = render(<TotalUser data={mockData} />)
        const strongElement = wrapper.getElementsByTagName('strong')[0]
        const pElement = wrapper.getElementsByTagName('p')[0]

        expect(pElement.innerHTML).toBe("Sua parte: <strong>R$&nbsp;1.201,00</strong>")
        expect(strongElement.innerHTML).toBe("R$&nbsp;1.201,00")
    })
})