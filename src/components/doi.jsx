import React, { useState } from 'react'
import axios from 'axios'

const DOI = () => {
    const [doi, setDoi] = useState('')
    const [reference, setReference] = useState(null)

    const handleInputChange = (event) => {
        setDoi(event.target.value);
      }

    const handleSearch = (event) => {
        axios.get(`https://api.crossref.org/works/${doi}`)
        .then(response => {
          setReference(response.data)
        })
    }

    return (
        <div>
        <input
          type="text"
          value={doi}
          onChange={handleInputChange}
          placeholder="Syötä DOI-tunniste"
        />
        <button onClick={handleSearch}>Hae</button>
        {reference && (
        <div>
          <h2>Lähdeviite</h2>
          <p>{reference.message.title}</p>
          {/* Muut tiedot, joita haluat näyttää */}
        </div>
        )}
        </div>
    )

}

export default DOI
