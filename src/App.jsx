import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Lisaa from './components/lisaa'

function App() {
  const [artikkelit, setArtikkelit] = useState([])
  const [newKey, setNewKey] = useState('')
  //tästä eteenpäin on uutta
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newJournal, setNewJournal] = useState('')
  const [newYear, setNewYear] = useState('')
  const [newVolume, setNewVolume] = useState('')
  const [newPages, setNewPages] = useState('')

  //TODO: tarkistus, ettei tyhjää lomaketta tallenneta?
  const lisaaArtikkeli = (event) => {
    event.preventDefault()    
    const artikkeliObject = {
      key: newKey,
      author: newAuthor,
      title: newTitle,
      journal: newJournal,
      year: newYear,
      volume: newVolume,
      pages: newPages,
    }
    
    console.log(artikkeliObject)
    
    setArtikkelit(artikkelit.concat(artikkeliObject))
    console.log(artikkelit)
    setNewKey('')
    setNewAuthor('')
    setNewTitle('')
    setNewJournal('')
    setNewYear('')
    setNewVolume('')
    setNewPages('')

  }

  const handleKeyChange = (event) => {
    setNewKey(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleJournalChange = (event) => {
    setNewJournal(event.target.value)
  }

  const handleYearChange = (event) => {
    setNewYear(event.target.value)
  }

  const handleVolumeChange = (event) => {
    setNewVolume(event.target.value)
  }

  const handlePagesChange = (event) => {
    setNewPages(event.target.value)
  }

  return (
    <>
        <h1>Lisää artikkeli</h1>
        <Lisaa 
          lisaaArtikkeli={lisaaArtikkeli} 
          newKey={newKey}
          handleKeyChange={handleKeyChange}
          newAuthor={newAuthor}
          handleAuthorChange={handleAuthorChange}
          newTitle={newTitle}
          handleTitleChange={handleTitleChange}
          newJournal={newJournal}
          handleJournalChange={handleJournalChange}
          newYear={newYear}
          handleYearChange={handleYearChange}
          newVolume={newVolume}
          handleVolumeChange={handleVolumeChange}
          newPages={newPages}
          handlePagesChange={handlePagesChange}
        />
        <h2>Lähteet</h2>
        {artikkelit.map((artikkeli, indeksi) => ( //tänne jotkut tarkistukset?
          <div key={indeksi} className="artikkelituloste">
            <p> [{indeksi+1}] </p>
            <p> {artikkeli.author} </p>
            <p> {artikkeli.title} </p>
            <p> {artikkeli.journal} </p>
            <p> {artikkeli.year} </p>
            <p> {artikkeli.volume} </p>
            <p> {artikkeli.pages} </p>
          </div>
        ))}

    </>
  )
}

export default App
