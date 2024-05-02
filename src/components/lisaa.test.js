import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Lisaa from './lisaa'


  test('Lisaa updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const lisaaArtikkeli = jest.fn()

    render(<Lisaa lisaaArtikkeli={lisaaArtikkeli} />)  

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('lisää')

    await user.type(inputs[0], 'test key')
    await user.type(inputs[1], 'test author')
    await user.type(inputs[2], 'test title')
    await user.type(inputs[3], 'test journal')
    await user.type(inputs[4], 'test year')
    await user.type(inputs[5], 'test volume')
    await user.type(inputs[6], 'test pages')
    await user.click(sendButton)

    await expect(lisaaArtikkeli.mock.calls).toHaveLength(1)
    await expect(lisaaArtikkeli).toHaveBeenCalled()

  })

