import { useState, useEffect } from 'react'
import axios from 'axios'
import Lisaa from './components/lisaa'
import { saveAs } from 'file-saver'
import './App.css'

function App() {
  const [artikkelit, setArtikkelit] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/artikkelit')
      .then(response => {
        console.log('promise fulfilled')
        setArtikkelit(response.data)
      })
  }, [])
  console.log('render', artikkelit.length, 'artikkelit')

  const lisaaArtikkeli = (artikkeliObject) => {

    axios
    .post('http://localhost:3001/artikkelit', artikkeliObject)
    .then(response => {
      setArtikkelit(artikkelit.concat(artikkeliObject))
    })
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

  //Luodaan sisältö valmiiksi tallennettavaa bibtex-tiedostoa varten
  let bibtexContent = ''
  artikkelit.forEach(artikkeli => {
    bibtexContent += generateBibTeX(artikkeli) + ('\n\n')
  })

  //Tallennetaan lähteet tiedostona koneelle
  function downloadBibTeXFile() {
    console.log("ladataan joskus:")
    console.log(bibtexContent)

    const blob = new Blob([bibtexContent], { type: 'text/plain;charset=utf-8' });
    const fileName = 'bibText.bib'
    saveAs(blob, fileName);
  }
  
  return (
    <>
        <h1>Lisää artikkeli</h1>
        <Lisaa createArtikkeli={lisaaArtikkeli} />
        <h2>Lähteet</h2>
      {artikkelit.map((artikkeli, indeksi) => (
        <div key={indeksi} className="artikkelituloste">
          <p>[{indeksi + 1}]</p>
          <p>{artikkeli.articleKey}. {artikkeli.author}. ({artikkeli.year}).</p>
          <p className="artikkelititle">{artikkeli.title}.</p>
          <p className="artikkelijournal">{artikkeli.journal},</p>
          <p>{artikkeli.volume}, {artikkeli.pages}. </p>
          
        </div>
      ))}
      <button onClick={downloadBibTeXFile}>Lataa BibTeX-tiedosto</button>
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