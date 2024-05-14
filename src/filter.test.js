import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App'

//Ei haeta eikä tallenneta databaseen. Näin ei tarvi
//välittää, jos databasesta löytyisi duplikaatteja
//tai että testialkiot sotkisivat sen.
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
}))

//Testataan yksittäisen artikkelin tulostamisen toimivuutta
test('Filtering sorts two added articles', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)

    // Oikea lomake auki
    const artikkeliButton = container.querySelector('#artikkeli-button')
    await user.click(artikkeliButton)

    //Input elementit talteen
    const keyInput = container.querySelector('#key-input')
    const authorInput = container.querySelector('#author')
    const titleInput = container.querySelector('#title')
    const journalInput = container.querySelector('#journal')
    const yearInput = container.querySelector('#year')
    const volumeInput = container.querySelector('#volume')
    const pagesInput = container.querySelector('#pages')
    const sendButton = container.querySelector('#lisaa-button')
    const sortButton = container.querySelector('#jarjesta-button')
    
    //Syötetään testidata inputteihin
    await user.type(keyInput, 'testkey')
    await user.type(authorInput, 'author test')
    await user.type(titleInput, 'test title')
    await user.type(journalInput, 'test journal')
    await user.type(yearInput, '2023')
    await user.type(volumeInput, 'test volume')
    await user.type(pagesInput, '22-45')
    await user.click(sendButton)

    await user.type(keyInput, 'testkey')
    await user.type(authorInput, 'test author')
    await user.type(titleInput, 'test title')
    await user.type(journalInput, 'test journal')
    await user.type(yearInput, '2023')
    await user.type(volumeInput, 'test volume')
    await user.type(pagesInput, '22-45')
    await user.click(sendButton)

    await user.click(sortButton)

    await waitFor(() => {
        const ekalisays = screen.getByText('test author.')
        const tokalisays = screen.getByText('author test.')
        expect(ekalisays.compareDocumentPosition(tokalisays)).toBe(4) //https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
    })
})

/**
//Testataan yksittäisen artikkelin tulostamisen toimivuutta
test('Filtering sorts two added articles when name doesn\'t contain last name', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)

    // Oikea lomake auki
    const artikkeliButton = container.querySelector('#artikkeli-button')
    await user.click(artikkeliButton)

    //Input elementit talteen
    const keyInput = container.querySelector('#key-input')
    const authorInput = container.querySelector('#author')
    const titleInput = container.querySelector('#title')
    const journalInput = container.querySelector('#journal')
    const yearInput = container.querySelector('#year')
    const volumeInput = container.querySelector('#volume')
    const pagesInput = container.querySelector('#pages')
    const sendButton = container.querySelector('#lisaa-button')
    const sortButton = container.querySelector('#jarjesta-button')
    
    //Syötetään testidata inputteihin
    await user.type(keyInput, 'testkey')
    await user.type(authorInput, 'ceed')
    await user.type(titleInput, 'test title')
    await user.type(journalInput, 'test journal')
    await user.type(yearInput, '2023')
    await user.type(volumeInput, 'test volume')
    await user.type(pagesInput, '22-45')
    await user.click(sendButton)

    await user.type(keyInput, 'testkey')
    await user.type(authorInput, 'author test')
    await user.type(titleInput, 'test title')
    await user.type(journalInput, 'test journal')
    await user.type(yearInput, '2023')
    await user.type(volumeInput, 'test volume')
    await user.type(pagesInput, '22-45')
    await user.click(sendButton)

    await user.type(keyInput, 'testkey')
    await user.type(authorInput, 'ceed test')
    await user.type(titleInput, 'test title')
    await user.type(journalInput, 'test journal')
    await user.type(yearInput, '2023')
    await user.type(volumeInput, 'test volume')
    await user.type(pagesInput, '22-45')
    await user.click(sendButton)


    await user.click(sortButton)

    await waitFor(() => {
        const ekalisays = screen.getByText('test author.')
        const tokalisays = screen.getByText('author test.')
        expect(ekalisays.compareDocumentPosition(tokalisays)).toBe(4) //https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
    })
})
*/