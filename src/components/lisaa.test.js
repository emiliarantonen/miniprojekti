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
    await user.type(keyInput, 'test key')
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
      articleKey: 'test key',
      author: 'test author',
      title: 'test title',
      journal: 'test journal',
      year: '2023',
      volume: 'test volume',
      pages: '22-45',
    })



  })

