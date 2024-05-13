import { useState, useEffect } from 'react'
import axios from 'axios'
import Lisaa from './components/lisaa'
import { saveAs } from 'file-saver'
import './App.css'

function App() {
  const [artikkelit, setArtikkelit] = useState([])
  const [message, setMessage] = useState('');

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
      const authors = artikkeli.author.map(author => `${author.lastName}, ${author.firstName}`).join(' and ')
      return `@article{${artikkeli.articleKey},
              author = {${authors}},
              title = {${artikkeli.title}},
              journal = {${artikkeli.journal}},
              year = {${artikkeli.year}},
              volume = {${artikkeli.volume}},
              pages = {${artikkeli.pages}}
            }`
    }

  //Luodaan sisältö valmiiksi tallennettavaa bibtex-tiedostoa varten
  let bibtexContent = ''
  artikkelit.forEach(artikkeli => {
    bibtexContent += generateBibTeX(artikkeli) + ('\n\n')
  })

  //Tallennetaan lähteet tiedostona koneelle
  function downloadBibTeXFile() {
    const blob = new Blob([bibtexContent], { type: 'text/plain;charset=utf-8' });
    const fileName = 'bibText.bib'
    saveAs(blob, fileName);
  }
  
  //Tarvittaessa tietokannan tyhennystä varten 

  const clearDatabase = async () => {
    try {
      const response = await axios.get('http://localhost:3001/artikkelit');
      const articles = response.data;
      // Käydään läpi jokainen id ja lähetetään DELETE-pyyntö
      for (const article of articles) {
        await axios.delete(`http://localhost:3001/artikkelit/${article.id}`);
        console.log(`Artikkeli ID: ${article.id} poistettu`);
      }
      // Päivitä näkymä
      window.location.reload();
    } catch (error) {
      console.error('Virhe:', error);
    }
  };

  return (
    <>
        <h1>Lisää artikkeli</h1>
        <Lisaa createArtikkeli={lisaaArtikkeli} />
        <h2>Lähteet</h2>
        {/* tietokannan tyhennys */}
        <button onClick={clearDatabase}>Tyhjennä tietokanta</button>
        <p>{message}</p>
        {artikkelit.map((artikkeli, indeksi) => (
        <div key={indeksi} className="artikkelituloste">
          <p>[{indeksi + 1}]</p>
          <p>{artikkeli.author.map((author, index) => {
            if (index === 0) {
              return `${author.lastName}, ${author.firstName.charAt(0)}.`
            } else {
              return ` & ${author.firstName.charAt(0)}. ${author.lastName}`;
            }
          })}. ({artikkeli.year}).</p>
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