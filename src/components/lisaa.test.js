import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Lisaa from './lisaa'

test('Lisaa updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const lisaaArtikkeli = jest.fn()

    const { container } = render(<Lisaa createArtikkeli={lisaaArtikkeli} />)  

    const keyInput = container.querySelector('#key-input')
    const authorInput = container.querySelector('#author')
    const titleInput = container.querySelector('#title')
    const journalInput = container.querySelector('#journal')
    const yearInput = container.querySelector('#year')
    const volumeInput = container.querySelector('#volume')
    const pagesInput = container.querySelector('#pages')
    const sendButton = container.querySelector('#lisaa-button')
  
    // Täytetään lomake
    await user.type(keyInput, 'testkey')
    await user.type(authorInput, 'test author')
    await user.type(titleInput, 'test title')
    await user.type(journalInput, 'test journal')
    await user.type(yearInput, '2023')
    await user.type(volumeInput, 'test volume')
    await user.type(pagesInput, '22-45')
    await user.click(sendButton)

    //testataan, että lisaaArtikkeli kutsutaan lomakkeen hyväksymisen jälkeen
    expect(lisaaArtikkeli).toHaveBeenCalledTimes(1)
    //testataan, että lisaaArtikkeli kutsutaan oikealla parametrilla
    expect(lisaaArtikkeli).toHaveBeenCalledWith({
      articleKey: 'testkey',
      author: [{firstName: "test",
        lastName: "author"
      }],
      title: 'test title',
      journal: 'test journal',
      year: '2023',
      volume: 'test volume',
      pages: '22-45',
    })
})


test('Lisaa displays alert when not all fields are filled', async () => {
  const lisaaArtikkeli = jest.fn()

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

  render(<Lisaa createArtikkeli={lisaaArtikkeli} />)

  const sendButton = screen.getByText('lisää')

  await userEvent.click(sendButton)

  //tarkistaa, ettei lisää artikkelia kutsuta jos kaikki kentät ei ole täytetty
  expect(lisaaArtikkeli).toHaveBeenCalledTimes(0)

  // Tarkista, että `window.alert`-funktiota kutsutaan halutulla viestillä
  expect(alertSpy).toHaveBeenCalledWith('Kaikkien kenttien täyttäminen on pakollista')

  alertSpy.mockRestore()

})