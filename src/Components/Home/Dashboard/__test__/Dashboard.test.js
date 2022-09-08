import React from "react"
import { render, screen } from '@testing-library/react'
import Dashboard from "../Dashboard"
import { DatabaseContext } from "../../../../DatabaseContext"

const data = {
    "CardTestOne": {
        "PeopleOneTestCardOne": {
            "ItemOne": {
                "categoria": "Outros",
                "valor": 100
            },
        },
        "cor": "#1c00f0"
    },
    "CardTestTwo": {
        "PeopleOneTestCardTwo": {
            "Item Three": {
                "categoria": "Outros",
                "valor": 100.5
            },
            "Item Four": {
                "categoria": "Outros",
                "valor": 100
            }
        },
        "cor": "#c800ff"
    }
}

const allData = {
    "setembro2022": {
        "CardTestOne": {
            "PeopleOneTestCardOne": {
                "ItemOne": {
                    "categoria": "Outros",
                    "valor": 100
                },
            },
            "cor": "#1c00f0"
        },
        "CardTestTwo": {
            "PeopleOneTestCardTwo": {
                "Item Three": {
                    "categoria": "Outros",
                    "valor": 100.5
                },
                "Item Four": {
                    "categoria": "Outros",
                    "valor": 100
                }
            },
            "cor": "#c800ff"
        }
    }
}

const setDate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => (jest.fn()),
    Link: () => (jest.fn())
}))

describe('Component rendering with true loading property', () => {
    it('Loading component must be visible', () => {
        const loading = true
        const { container } = render(
            <DatabaseContext.Provider value={{ setDate, data, loading }}>
                <Dashboard />
            </DatabaseContext.Provider>
        )

        const loadingElement = container.querySelector('.loading')
        expect(loadingElement).toBeTruthy()
    })
})

describe('Component rendering without data', () => {
    it("text 'Nenhum dado encontrado' should be visible", () => {
        const loading = false
        const data = {}
        const { container } = render(
            <DatabaseContext.Provider value={{ setDate, data, loading }}>
                <Dashboard />
            </DatabaseContext.Provider>
        )

        const pElement = container.getElementsByTagName('p')[0]
        expect(pElement.innerHTML).toBe('Nenhum dado encontrado :(')
    })
})


describe('Component rendering with data', () => {
    let container
    const loading = false
    const cards = ["CardTestOne", "CardTestTwo"]
    const categorys = ['Outros']
    const date = 'setembro2022'

    beforeEach(() => {
        const { container: wrapper } = render(
            <DatabaseContext.Provider value={{ setDate, data, loading, cards, categorys, date, allData }}>
                <Dashboard />
            </DatabaseContext.Provider>
        )
        container = wrapper
    })

    it('must be visible 2 cards', () => {
        const h1 = container.getElementsByTagName('h1')
        expect(h1.length).toBe(2)
        expect(h1[0].innerHTML).toBe('CardTestOne')
        expect(h1[1].innerHTML).toBe('CardTestTwo')
    })

    it('should be visible the month and year filter', () => {
        expect(screen.queryByTestId('selectMonth')).toBeTruthy()
        expect(screen.queryByTestId('selectYear')).toBeTruthy()
    })

    it('line and pie chart should be visible', () => {
        const chartPie = container.querySelector('.chartPie')
        const chartLine = container.querySelector('.chartLine')

        expect(chartPie).toBeTruthy()
        expect(chartLine).toBeTruthy()
    })

    it('TotalUser component must be visible', () => {
        const totalUserElement = container.querySelector('.totalUser p')
        expect(totalUserElement.innerHTML).toBe("Sua parte: <strong>R$&nbsp;0,00</strong>")
    })
})