import React from "react"
import { render, fireEvent } from '@testing-library/react'

import DashboardFilter from "../DashboardFilter"

const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
]
const years = ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']

const setDateFilter = jest.fn()

describe('Component rendering correctly', () => {
    it('should show month and year filters', () => {
        const { queryByTestId } = render(<DashboardFilter setDateFilter={setDateFilter} monthToday={'setembro'} yearToday={2022} months={months} years={years}/>)

        expect(queryByTestId('selectMonth')).toBeTruthy()
        expect(queryByTestId('selectYear')).toBeTruthy()
    })

    it('should show in the filters the values ​​of September and 2022 by default', () => {
        const { container: wrapper } = render(<DashboardFilter setDateFilter={setDateFilter} monthToday={'setembro'} yearToday={2022} months={months} years={years}/>)

        const monthElement = wrapper.getElementsByTagName('select')[0]
        const yearElement = wrapper.getElementsByTagName('select')[1]

        expect(monthElement.value).toBe("setembro")
        expect(yearElement.value).toBe("2022")
    })

    it('must update filters when selecting other options', () => {
        const { container: wrapper } = render(<DashboardFilter setDateFilter={setDateFilter} monthToday={'setembro'} yearToday={2022} months={months} years={years}/>)
        const monthElement = wrapper.getElementsByTagName('select')[0]
        const yearElement = wrapper.getElementsByTagName('select')[1]
        
        fireEvent.change(monthElement, { target: { value: 'outubro' }})
        fireEvent.change(yearElement, { target: { value: 2022 }})

        expect(monthElement.value).toBe("outubro")
        expect(yearElement.value).toBe("2022")
    })
})