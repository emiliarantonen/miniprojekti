import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Lisaa from './components/lisaa'

function App() {
  const [artikkelit, setArtikkelit] = useState([])
  const [newKey, setNewKey] = useState('')

  const lisaaArtikkeli = (event) => {
    event.preventDefault()    
    const artikkeliObject = {
      key: newKey,
      author:null,
      title:null,
      journal:null,
      year:null,
      volume:null,
      pages:null,
    }
  
    setArtikkelit(artikkelit.concat(artikkeliObject))
    setNewKey('')
  }

  const handleKeyChange = (event) => {
    setNewKey(event.target.value)
  }

  return (
    <>
        <h1>Lisää artikkeli</h1>
        <Lisaa 
          lisaaArtikkeli={lisaaArtikkeli} 
          newKey={newKey}
          handleKeyChange={handleKeyChange}
        />
        <h2>Lähteet</h2>
    </>
  )
}

export default App
