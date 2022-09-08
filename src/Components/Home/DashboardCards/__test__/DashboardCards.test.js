import React from "react"
import * as router from 'react-router'
import { render } from '@testing-library/react'
import DashboardCards from "../DashboardCards"

const mockData = {
    "PeopleOne": {
        "Item 1": {
            "categoria": "Outros",
            "valor": 100
        },
        "CItem 2": {
            "categoria": "Outros",
            "valor": 100
        },
        "Item 3": {
            "categoria": "Faculdade",
            "valor": 100
        }
    },
    "cor": "#000"
}
const mockCard = 'CardTest'
const navigate = jest.fn()

describe('Component rendering correctly', () => {
    beforeEach(() => {
      jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    it('CardTest should render', () => {
        const { getByText } = render(<DashboardCards data={mockData} card={mockCard} />)
        expect(getByText('CardTest')).toBeTruthy()
    })

    it('value must be visible', () => {
        const { getByText } = render(<DashboardCards data={mockData} card={mockCard} />)
        expect(getByText('R$ 300,00')).toBeTruthy()
    })
})