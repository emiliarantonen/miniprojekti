import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Lisaa from './components/lisaa'
import './App.css'

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

  //tarkistus että vuosinumero on 4 numeroa pitkä
  //ja pienempi kuin tämä vuosi + 1
  const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    return /^\d{4}$/.test(year) && parseInt(year) < currentYear+1;
  }

  const validatePages = (pages) => {
    return parseInt(pages) > 0
  }

  const lisaaArtikkeli = (event) => {
    event.preventDefault()    
  
    if(!newKey || !newAuthor || !newTitle || !newJournal ||!newYear || !newVolume || !newPages){
      alert('Kaikkien kenttien täyttäminen on pakollista')
      return;
    }

    if (!validatePages(newPages)) {
      alert('Anna kelvollinen luku sivuille!')
      return;
    }

    if (!validateYear(newYear)) {
      alert('Vuosiluvun tulee olla nelinumeroinen ja maksimissaan tämämän hetkinen vuosiluku.');
      return;
    }

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

    // Funktio BibTeX-muotoisen merkkijonon rakentamiseksi
    const generateBibTeX = (artikkeli) => {
      return `@article{${artikkeli.key},
    author = {${artikkeli.author}},
    title = {${artikkeli.title}},
    journal = {${artikkeli.journal}},
    year = {${artikkeli.year}},
    volume = {${artikkeli.volume}},
    pages = {${artikkeli.pages}}
  }`;
    };

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
      {artikkelit.map((artikkeli, indeksi) => (
        <div key={indeksi} className="artikkelituloste">
          <p>[{indeksi + 1}]</p>
          <p> {artikkeli.key}. {artikkeli.author}. ({artikkeli.year}). </p>
          <p className="artikkelititle"> {artikkeli.title}. </p>
          <p className="artikkelijournal"> {artikkeli.journal}, </p>
          <p>{artikkeli.volume}, {artikkeli.pages}. </p>
          
        </div>
      ))}
      <h2>Lähteet BibTeX-muodossa</h2>
      {artikkelit.map((artikkeli, indeksi) => (
        <div key={indeksi} className="artikkelituloste">
          <p><pre>{generateBibTeX(artikkeli)}</pre></p>
        </div>
      ))}

    </>
  )
}

export default App
