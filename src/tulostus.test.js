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
test('Adding an article prints it to the site', async () => {
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
    
    //Syötetään testidata inputteihin
    await user.type(keyInput, 'testkey')
    await user.type(authorInput, 'test author')
    await user.type(titleInput, 'test title')
    await user.type(journalInput, 'test journal')
    await user.type(yearInput, '2023')
    await user.type(volumeInput, 'test volume')
    await user.type(pagesInput, '22-45')
    await user.click(sendButton)

    /** Täytyy olla await waitFor, jotta syötetty data kerkee päivittyä
        html-rakenteeseen.Tarkastetaan, että syötetty data löytyy näytöltä 
        tulostettuna */
    await waitFor(() => {
        //muotoilun takia <p>key. author. (vuosi.) testataan vastaavasti
        const eka = screen.getByText(`test author.`)
        expect(eka).toBeInTheDocument()

        const toka = screen.getByText(`test title.`)
        expect(toka).toBeInTheDocument()

        const kolmas = screen.getByText(`test journal,`)
        expect(kolmas).toBeInTheDocument()

        const neljas = screen.getByText(`test volume:22-45,`)
        expect(neljas).toBeInTheDocument()

        const viides = screen.getByText('2023.')
        expect(viides).toBeInTheDocument()
    })
})
 
//Testataan useamman artikkelin tulostamisen toimivuutta.
//Sama toimintatapa kuin ylempänä, mutta useammalle.
test('Adding multiple articles prints them to the site', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)

    const artikkeliButton = container.querySelector('#artikkeli-button')
    await user.click(artikkeliButton)

    const keyInput = container.querySelector('#key-input')
    const authorInput = container.querySelector('#author')
    const titleInput = container.querySelector('#title')
    const journalInput = container.querySelector('#journal')
    const yearInput = container.querySelector('#year')
    const volumeInput = container.querySelector('#volume')
    const pagesInput = container.querySelector('#pages')
    const sendButton = container.querySelector('#lisaa-button')
  
    for (let i = 0; i < 2; i++) {
        await user.type(keyInput, `testkey${i}`)
        await user.type(authorInput, `test author${i}`)
        await user.type(titleInput, `test title${i}`)
        await user.type(journalInput, `test journal${i}`)
        await user.type(yearInput, `202${i}`)
        await user.type(volumeInput, `test volume${i}`)
        await user.type(pagesInput, '22-45')
        await user.click(sendButton)
    }

    await waitFor(() => {
        for (let i = 0; i < 2; i++) {
            const eka = screen.getByText(`test author${i}.`)
            expect(eka).toBeInTheDocument()

            const toka = screen.getByText(`test title${i}.`)
            expect(toka).toBeInTheDocument()

            const kolmas = screen.getByText(`test journal${i},`)
            expect(kolmas).toBeInTheDocument()

            const neljas = screen.getByText(`test volume${i}:22-45,`)
            expect(neljas).toBeInTheDocument()

            const viides = screen.getByText(`202${i}.`)
            expect(viides).toBeInTheDocument()
        }
    })
})

//Testataan yhdistelmäartikkelin luonti
test('Adding composite article and prints them to the site', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)

    const artikkeliButton = container.querySelector('#yhdistelma-button')
    await user.click(artikkeliButton)

    const keyInput = container.querySelector('#key-input')
    const authorInput = container.querySelector('#author')
    const titleInput = container.querySelector('#title')
    const yearInput = container.querySelector('#year')
    const bookTitle = container.querySelector('#booktitle')
    const sendButton = container.querySelector('#lisaa-button')
  
    await user.type(keyInput, `testkey`)
    await user.type(authorInput, `test author`)
    await user.type(titleInput, `test title`)
    await user.type(yearInput, '2023')
    await user.type(bookTitle, 'test name')
    await user.click(sendButton)

    await waitFor(() => {
        const eka = screen.getByText(`test author.`)
        expect(eka).toBeInTheDocument()
        const toka = screen.getByText(`test title.`)
        expect(toka).toBeInTheDocument()
        const kolmas = screen.getByText(`test name,`)
        expect(kolmas).toBeInTheDocument()
        const neljas = screen.getByText(`2023.`)
        expect(neljas).toBeInTheDocument()
    })
})

//Testataan usean yhdistelmäartikkelin lisäys
test('Adding multiple composite articles and printing them to the site', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)

    const artikkeliButton = container.querySelector('#yhdistelma-button')
    await user.click(artikkeliButton)

    const keyInput = container.querySelector('#key-input')
    const authorInput = container.querySelector('#author')
    const titleInput = container.querySelector('#title')
    const yearInput = container.querySelector('#year')
    const bookTitle = container.querySelector('#booktitle')
    const sendButton = container.querySelector('#lisaa-button')
  
    for (let i = 0; i < 2; i++) {
        await user.type(keyInput, `testkey`)
        await user.type(authorInput, `test author${i}`)
        await user.type(titleInput, `test title${i}`)
        await user.type(yearInput, `200${i}`)
        await user.type(bookTitle, `test name${i}`)
        await user.click(sendButton)
    }

    await waitFor(() => {
        for (let i = 0; i < 2; i++) {
            const eka = screen.getByText(`test author${i}.`)
            expect(eka).toBeInTheDocument()
            const toka = screen.getByText(`test title${i}.`)
            expect(toka).toBeInTheDocument()
            const kolmas = screen.getByText(`test name${i},`)
            expect(kolmas).toBeInTheDocument()
            const neljas = screen.getByText(`200${i}.`)
            expect(neljas).toBeInTheDocument()
        }
    })
})