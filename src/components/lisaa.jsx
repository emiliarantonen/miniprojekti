import { useState } from 'react'

const Lisaa = ({ createArtikkeli }) => {

  const [newArtikkeli, setNewArtikkeli] = useState('')
  const [newKey, setNewKey] = useState('')
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

  const addArtikkeli = (event) => {
    event.preventDefault()

    if (!newKey || !newAuthor || !newTitle || !newJournal || !newYear || !newVolume || !newPages) {
      alert('Kaikkien kenttien täyttäminen on pakollista')
      return;
    }

    if (!validatePages(newPages)) {
      alert('Anna kelvollinen luku sivuille!')
      return;
    }

    if (!validateYear(newYear)) {
      alert('Vuosiluvun tulee olla nelinumeroinen ja maksimissaan tämämän hetkinen vuosiluku.')
      return;
    }
    const newArtikkeli = {
      articleKey: newKey,
      author: newAuthor,
      title: newTitle,
      journal: newJournal,
      year: newYear,
      volume: newVolume,
      pages: newPages,
    }

    setNewArtikkeli(newArtikkeli)

    createArtikkeli(newArtikkeli)
    
    setNewArtikkeli('')
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
           
    return(
    <form onSubmit={addArtikkeli}> 
        <div>
          key: <input value={newKey} onChange={handleKeyChange} id='key-input'/>
        </div>
        <div>
          author: <input value={newAuthor} onChange={handleAuthorChange} id='author'/>
        </div>
        <div>
          title: <input value={newTitle} onChange={handleTitleChange} id='title'/>
        </div>
          journal: <input value={newJournal} onChange={handleJournalChange} id='journal'/>
        <div>
          year: <input value={newYear} onChange={handleYearChange} id='year'/>
        </div>
        <div>
          volume: <input value={newVolume} onChange={handleVolumeChange} id='volume'/>
        </div>
        <div>
          pages: <input value={newPages} onChange={handlePagesChange} id='pages'/>
        </div>
        <div>
          <button type="submit" id='lisaa-button'>lisää</button>
       </div>
       <div>
       
               
            </div>
    </form>
        
    )
}



export default Lisaa