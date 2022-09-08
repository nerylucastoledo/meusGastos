import React from "react"
import * as router from 'react-router'
import { render, screen } from '@testing-library/react'
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
      render(<DashboardCards data={mockData} card={mockCard} />)
    })

    it('CardTest should render', () => {
        expect(screen.getByText('CardTest')).toBeTruthy()
    })

    it('value must be visible', () => {
        expect(screen.getByText('R$ 300,00')).toBeTruthy()
    })
})