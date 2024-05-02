const Lisaa = ({lisaaArtikkeli, newKey, handleKeyChange,
                newAuthor, handleAuthorChange,
                newTitle, handleTitleChange,
                newJournal, handleJournalChange,
                newYear, handleYearChange,
                newVolume, handleVolumeChange,
                newPages, handlePagesChange
}) => {

           
    return(
    <form onSubmit={lisaaArtikkeli}> 
        <div>
          key: <input value={newKey} onChange={handleKeyChange}/>
        </div>
        <div>
          author: <input value={newAuthor} onChange={handleAuthorChange}/>
        </div>
        <div>
          title: <input value={newTitle} onChange={handleTitleChange}/>
        </div>
          journal: <input value={newJournal} onChange={handleJournalChange}/>
        <div>
          year: <input value={newYear} onChange={handleYearChange}/>
        </div>
        <div>
          volume: <input value={newVolume} onChange={handleVolumeChange}/>
        </div>
        <div>
          pages: <input value={newPages} onChange={handlePagesChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
       </div>
       <div>
       
               
            </div>
    </form>
        
    )
}



export default Lisaa