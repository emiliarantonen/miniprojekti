import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'; // Import axios
import DOI from './doi';

jest.mock('axios')

test('Arcticle is added using a working DOI', async () => {
    const user = userEvent.setup()
    const DOI = jest.fn()
    
    const { container } = render(<DOI createByDOI ={DOI} />)

    const mockResponse = {
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

    axios.get.mockResolvedValueOnce({ data: mockResponse })


    //vaadittavat kohdat
    const keyInput = container.querySelector('#key-input')
    const doiInput = container.querySelector('#DOI-input')
    const haeButton = container.querySelector('#hae-button')

    //lomakkeen täyttö
    await user.type(keyInput, 'testKey')
    await user.type(doiInput, '10.1111/j.1365-201x.2005.01464.x')
    await user.click(haeButton)

    await waitFor(() => {
        
    //testataan, että lisaaDOI kutsutaan lomakkeen hyväksymisen jälkeen
    expect(DOI).toHaveBeenCalledTimes(1)
    
    //testataan, että lisaaDOI lisää oikean datan
    expect(DOI).toHaveBeenCalledWith({
        articleKey: 'testKey',
        author: [
        { firstName: "J.", lastName: "Leppäluoto" },
        { firstName: "T.", lastName: "Pääkkönen" },
        { firstName: "I.", lastName: "Korhonen" },
        { firstName: "J.", lastName: "Hassi" }
        ],
        title: 'Pituitary and autonomic responses to cold exposures in man',
        journal: 'Acta Physiologica Scandinavica',
        year: '2005',
        volume: '184',
        pages: '255-264',
        DOI: '10.1111/j.1365-201x.2005.01464.x'
      })
    })
})

/*test('LisaaDOI displays an alert when all fields aren\'t filled', async () => {
    const lisaaDOI = jest.fn()
  
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
  
    render(<DOI createByDOI ={lisaaDOI} />)
  
    const haeButton = screen.getByText('Hae')
  
    await userEvent.click(haeButton)
  
    //tarkistaa, ettei lisää DOI artikkelia kutsuta jos kaikki kentät ei ole täytetty
    expect(lisaaDOI).toHaveBeenCalledTimes(0)
  
    // Tarkista, että `window.alert`-funktiota kutsutaan halutulla viestillä
    expect(alertSpy).toHaveBeenCalledWith('Kaikkien kenttien täyttäminen on pakollista')
  
    alertSpy.mockRestore()
})*/