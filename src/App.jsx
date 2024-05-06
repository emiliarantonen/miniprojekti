import { useState } from 'react'
import Lisaa from './components/lisaa'
import { saveAs } from 'file-saver'; 
import './App.css'

function App() {
  const [artikkelit, setArtikkelit] = useState([])

  const lisaaArtikkeli = async (artikkeliObject) => {
    await setArtikkelit(artikkelit.concat(artikkeliObject))
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

  //TODO: kansion luonti tänne, sisältö siihen
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