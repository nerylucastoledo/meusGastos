import React from "react"
import { render } from "@testing-library/react"
import Loading from "../Loading"

describe('Testing Loading component', () => {
    it('must be visible when called', () => {
        const { container: wrapper } = render(<Loading />)
        expect(wrapper.getElementsByClassName('loading')[0]).toBeTruthy()
    })
})