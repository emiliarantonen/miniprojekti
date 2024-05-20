import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios' 
import DOI from './doi'

jest.mock('axios')

const mockData = {
    message: {
        type: "journal-article",
        author: [
            { given: "J.", family: "Leppäluoto" },
            { given: "T.", family: "Pääkkönen" },
            { given: "I.", family: "Korhonen" },
            { given: "J.", family: "Hassi" }
        ],
        title: ['Pituitary and autonomic responses to cold exposures in man'],
        'container-title': 'Acta Physiologica Scandinavica',
        created: { 'date-parts': [[2005]] },
        volume: '184',
        page: '255-264',
        DOI: '10.1111/j.1365-201x.2005.01464.x'
    }
}

axios.get.mockResolvedValueOnce({ data: mockData })

test('Arcticle is added using a working DOI', async () => {
    const user = userEvent.setup()
    const lisaaDOI = jest.fn()
    
    const { container } = render(<DOI createByDOI ={lisaaDOI} />)
    
    const keyInput = container.querySelector('#key-input')
    const doiInput = container.querySelector('#doi-input')
    const haeButton = container.querySelector('#hae-button')
    
    await user.type(keyInput, 'testKey')
    await user.type(doiInput, '10.1111/j.1365-201x.2005.01464.x')
    await user.click(haeButton)
    
    await waitFor(() => {
        expect(lisaaDOI).toHaveBeenCalledTimes(1)
    })

    await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('https://api.crossref.org/works/10.1111/j.1365-201x.2005.01464.x')
    })
})