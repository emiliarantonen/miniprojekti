const Lisaa = ({lisaaArtikkeli, newKey, handleKeyChange}) => {
    return(
    <form onSubmit={lisaaArtikkeli}> 
        <div>
          key: <input value={newKey} onChange={handleKeyChange}/>
        </div>
        <div>
          author:
        </div>
        <div>
          title: 
        </div>
          journal:
        <div>
          year:
        </div>
        <div>
          volume:
        </div>
        <div>
          pages:
        </div>
        <div>
          <button type="submit">lisää</button>
       </div>
    </form>
    )
}



export default Lisaa