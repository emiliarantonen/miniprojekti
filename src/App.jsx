import { useState, useEffect } from 'react'
import axios from 'axios'
import Lisaa from './components/lisaa'
import LisaaYhdArtikkeli from './components/lisaaYhdArtikkeli'
import LisaaKirja from './components/lisaaKirja'
import { saveAs } from 'file-saver'
import './App.css'


function App() {
  const [artikkelit, setArtikkelit] = useState([])
  const [message, setMessage] = useState('');
  const [artikkeliAuki, setArtikkeliAuki] = useState(false);
  const [yhdistelmaArtikkeliAuki, setYhdistelmaArtikkeliAuki] = useState(false);
  const [kirjaAuki, setKirjaAuki] = useState(false);

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

  const lisaaYhdArtikkeli = (artikkeliObject) => {
    axios
    .post('http://localhost:3001/artikkelit', artikkeliObject)
    .then(response => {
      setArtikkelit(artikkelit.concat(artikkeliObject))
    })
  }

  const lisaaKirja = (artikkeliObject) => {
    axios
    .post('http://localhost:3001/artikkelit', artikkeliObject)
    .then(response => {
      setArtikkelit(artikkelit.concat(artikkeliObject))
    })
  }

  // artikkelien järjestys kirjoittajan sukunimen perusteella
  const jarjastaArtikkelit = () => {
    const sortedArticles = [...artikkelit].sort((a, b) => {
      if (a.author[0].lastName === b.author[0].lastName) {
        const firstNameA = a.author[0].firstName.toLowerCase()
        const firstNameB = b.author[0].firstName.toLowerCase()
        return firstNameA.localeCompare(firstNameB)
      } 
      const lastNameA = a.author[0].lastName.toLowerCase()
      const lastNameB = b.author[0].lastName.toLowerCase()
      return lastNameA.localeCompare(lastNameB)
    })
    setArtikkelit(sortedArticles)
  }

    // Funktio BibTeX-muotoisen merkkijonon rakentamiseksi
    const generateBibTeX = (artikkeli) => {
      const authors = artikkeli.author.map(author => `${author.lastName}, ${author.firstName}`).join(' and ')

      if (artikkeli.booktitle)
        return `@inproceedings{${artikkeli.articleKey},
          author = {${authors}},
          title = {${artikkeli.title}},
          year = {${artikkeli.year}},
          booktitle = {${artikkeli.booktitle}}
          }`

      if (artikkeli.publisher) 
        return `@book{${artikkeli.articleKey},
          author = {${authors}},
          title = {${artikkeli.title}},
          year = {${artikkeli.year}},
          publisher = {${artikkeli.publisher}}
          }`

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

  const toggleArtikkeli = () => {
    setArtikkeliAuki(!artikkeliAuki);
    if(yhdistelmaArtikkeliAuki)
      setYhdistelmaArtikkeliAuki(false)
    console.log(yhdistelmaArtikkeliAuki)
    if(kirjaAuki)
      setKirjaAuki(false)
  };

  const toggleYhdistelmaArtikkeli = () => {
    setYhdistelmaArtikkeliAuki(!yhdistelmaArtikkeliAuki);
    console.log(yhdistelmaArtikkeliAuki)
    if(artikkeliAuki)
      setArtikkeliAuki(false)
    if(kirjaAuki)
      setKirjaAuki(false)
  };

  const toggleKirja = () => {
    setKirjaAuki(!kirjaAuki);
    console.log(kirjaAuki)
    if(artikkeliAuki)
      setArtikkeliAuki(false)
    if(yhdistelmaArtikkeliAuki)
      setYhdistelmaArtikkeliAuki(false)
  };

  return (
    <>
        <h1>Lisää lähteitä</h1>
        <button id='artikkeli-button' onClick={toggleArtikkeli}> Lisää artikkeli </button>
        <button id='yhdistelma-button' onClick={toggleYhdistelmaArtikkeli}> Lisää yhdistelmäartikkeli </button>
        <button id='kirja-button'onClick={toggleKirja}> Lisää kirja </button>
        {artikkeliAuki && <Lisaa createArtikkeli={lisaaArtikkeli} />}
        {yhdistelmaArtikkeliAuki && <LisaaYhdArtikkeli createYhdArtikkeli={lisaaYhdArtikkeli} />}
        {kirjaAuki && <LisaaKirja createKirja={lisaaKirja} />}
        <h2>Lähteet</h2>
        {/* tietokannan tyhennys */}
        <button onClick={clearDatabase}>Tyhjennä tietokanta</button>
        <button id="jarjesta-button" onClick={jarjastaArtikkelit}>Järjestä Artikkelit</button>
        <p>{message}</p>
        {artikkelit.map((artikkeli, indeksi) => (
        <div key={indeksi} className="artikkelituloste">
          <p>[{indeksi + 1}]</p>
          <p>{artikkeli.author.map((author, index) => {
            console.log(artikkeli)
            // Tulostuksissa näytettävän nimen muotoilu
            let fullname = `${author.firstName} ${author.lastName}`
            // Nimi tulostukseen
            if (index === 0) {
              return fullname               // Ensimmäinen authori ilman merkkejä
            } else if (index === artikkeli.author.length-1) {
              return ` and ${fullname}`;    // and ennen vikaa authoria
            }
            else {
              return `, ${fullname}`;       // pilkut muiden authorien väliin
            }
          })}.</p>
          <p className="artikkelititle">{artikkeli.title}.</p>
          { artikkeli.journal &&
            <>
              <p className="artikkelijournal">{artikkeli.journal},</p> 
              <p>{`${artikkeli.volume}:${artikkeli.pages},`}</p> 
            </>
          }
          {
            artikkeli.booktitle &&
            <>
              <p>{artikkeli.booktitle},</p>
            </>
          }
          {
            artikkeli.publisher &&
            <>
              <p>{artikkeli.publisher},</p>
            </>
          }
          <p>{artikkeli.year}.</p>
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