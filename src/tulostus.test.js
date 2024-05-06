import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App'


test('Adding an article prints it to the site', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)

    const keyInput = container.querySelector('#key-input')
    const authorInput = container.querySelector('#author')
    const titleInput = container.querySelector('#title')
    const journalInput = container.querySelector('#journal')
    const yearInput = container.querySelector('#year')
    const volumeInput = container.querySelector('#volume')
    const pagesInput = container.querySelector('#pages')
    const sendButton = container.querySelector('#lisaa-button')
  
    await user.type(keyInput, 'test key')
    await user.type(authorInput, 'test author')
    await user.type(titleInput, 'test title')
    await user.type(journalInput, 'test journal')
    await user.type(yearInput, '2023')
    await user.type(volumeInput, 'test volume')
    await user.type(pagesInput, '22-45')
    await user.click(sendButton)

    const eka = screen.getByText('test key. test author. (2023).')
    expect(eka).toBeInTheDocument()
    const toka = screen.getByText('test title.')
    expect(toka).toBeInTheDocument()
    const kolmas = screen.getByText('test volume, 22-45.')
    expect(kolmas).toBeInTheDocument()
})


test('Adding multiple articles prints them to the site', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)

    const keyInput = container.querySelector('#key-input')
    const authorInput = container.querySelector('#author')
    const titleInput = container.querySelector('#title')
    const journalInput = container.querySelector('#journal')
    const yearInput = container.querySelector('#year')
    const volumeInput = container.querySelector('#volume')
    const pagesInput = container.querySelector('#pages')
    const sendButton = container.querySelector('#lisaa-button')
  
    for (let i = 0; i < 3; i++) {
        await user.type(keyInput, `test key${i}`)
        await user.type(authorInput, `test author${i}`)
        await user.type(titleInput, `test title${i}`)
        await user.type(journalInput, `test journal${i}`)
        await user.type(yearInput, '2023')
        await user.type(volumeInput, `test volume${i}`)
        await user.type(pagesInput, '22-45')
        await user.click(sendButton)
    }

    for (let i = 0; i < 3; i++) {
        const eka = screen.getByText(`test key${i}. test author${i}. (2023).`)
        expect(eka).toBeInTheDocument()
        const toka = screen.getByText(`test title${i}.`)
        expect(toka).toBeInTheDocument()
        const kolmas = screen.getByText(`test volume${i}, 22-45.`)
        expect(kolmas).toBeInTheDocument()
    }
})