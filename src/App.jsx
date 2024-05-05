import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Lisaa from './components/lisaa'
import './App.css'

function App() {
  const [artikkelit, setArtikkelit] = useState([])

  const lisaaArtikkeli = async (artikkeliObject) => {

    console.log(artikkeliObject)
    
    await setArtikkelit(artikkelit.concat(artikkeliObject))
    console.log(artikkelit)
  }

    // Funktio BibTeX-muotoisen merkkijonon rakentamiseksi
    const generateBibTeX = (artikkeli) => {
      return `@article{${artikkeli.articleKey},
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
        <Lisaa createArtikkeli={lisaaArtikkeli} />
        <h2>Lähteet</h2>
        {console.log(artikkelit)}
      {artikkelit.map((artikkeli, indeksi) => (
        <div key={indeksi} className="artikkelituloste">
          <p>[{indeksi + 1}]</p>
          <p> {artikkeli.articleKey}. {artikkeli.author}. ({artikkeli.year}). </p>
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
