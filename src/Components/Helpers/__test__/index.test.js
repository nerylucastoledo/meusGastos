import { convert } from '../index'

describe('Testing function convert', () => {
    it('Convert it is a function', () => {
        expect(typeof convert).toBe('function')
    })

    it('Convert return the result correctly', () => {
        expect(convert(300)).toContain('R$')
        expect(convert(300)).toContain('300,00')
    })
})