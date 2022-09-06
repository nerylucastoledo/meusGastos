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
  

describe('Testing render component', () => {
    it('render correctly and show select', () => {
        const { queryByTestId } = render(<DashboardFilter setDateFilter={() => {}} monthToday={'setembro'} yearToday={2022} months={months} years={years}/>)
        
        expect(queryByTestId('selectMonth')).toBeTruthy()
        expect(queryByTestId('selectYear')).toBeTruthy()
    })

    it('render with default value equal setembro for month and 2022 for year', () => {
        const { container: wrapper } = render(<DashboardFilter setDateFilter={() => {}} monthToday={'setembro'} yearToday={2022} months={months} years={years}/>)
        
        const monthElement = wrapper.getElementsByTagName('select')[0]
        const yearElement = wrapper.getElementsByTagName('select')[1]

        expect(monthElement.value).toBe("setembro")
        expect(yearElement.value).toBe("2022")
    })
})

describe('Testing selects value', () => {
    let container 

    it('updates on change', () => {
        const { container: wrapper } = render(<DashboardFilter setDateFilter={() => {}} monthToday={'setembro'} yearToday={2022} months={months} years={years}/>)
        container = wrapper
        
        const monthElement = container.getElementsByTagName('select')[0]
        const yearElement = container.getElementsByTagName('select')[1]
        fireEvent.change(monthElement, { target: { value: 'outubro' }})
        fireEvent.change(yearElement, { target: { value: 2022 }})

        expect(monthElement.value).toBe("outubro")
        expect(yearElement.value).toBe("2022")
    })
})