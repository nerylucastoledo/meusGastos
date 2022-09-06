import React from "react"
import { render } from '@testing-library/react'
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

describe('render component with loading true', () => {
    it('to be component loading have visible', () => {
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

describe('render correctly without data', () => {
    it("to be text 'Nenhum dado encontrado' have visible in screen", () => {
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


describe('render correctly with data', () => {
    const loading = false
    const cards = ["CardTestOne", "CardTestTwo"]
    const categorys = ['Outros']
    const date = 'setembro2022'

    it('to be have 2 titles cards', () => {
        const { container } = render(
            <DatabaseContext.Provider value={{ setDate, data, loading, cards, categorys, date, allData }}>
                <Dashboard />
            </DatabaseContext.Provider>
        )
        const h1 = container.getElementsByTagName('h1')
        expect(h1.length).toBe(2)
        expect(h1[0].innerHTML).toBe('CardTestOne')
        expect(h1[1].innerHTML).toBe('CardTestTwo')
    })

    it('to be visible selects filter', () => {
        const { queryByTestId } = render(
            <DatabaseContext.Provider value={{ setDate, data, loading, cards, categorys, date, allData }}>
                <Dashboard />
            </DatabaseContext.Provider>
        )

        expect(queryByTestId('selectMonth')).toBeTruthy()
        expect(queryByTestId('selectYear')).toBeTruthy()
    })

    it('to be visible chart pie and line', () => {
        const { container } = render(
            <DatabaseContext.Provider value={{ setDate, data, loading, cards, categorys, date, allData }}>
                <Dashboard />
            </DatabaseContext.Provider>
        )

        const chartPie = container.querySelector('.chartPie')
        const chartLine = container.querySelector('.chartLine')


        expect(chartPie).toBeTruthy()
        expect(chartLine).toBeTruthy()
    })

    it('to be total user equal R$ 0,00', () => {
        const { container } = render(
            <DatabaseContext.Provider value={{ setDate, data, loading, cards, categorys, date, allData }}>
                <Dashboard />
            </DatabaseContext.Provider>
        )
        const totalUserElement = container.querySelector('.totalUser p')
        expect(totalUserElement.innerHTML).toBe("Sua parte: <strong>R$&nbsp;0,00</strong>")
    })
})