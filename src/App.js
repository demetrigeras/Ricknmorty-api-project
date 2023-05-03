import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {

const [randomIndex, setRandomIndex] = useState(0)
const [data, setData] = useState([])
const [name, setName] = useState('')
const [createname, setcreateName] = useState('')
const [deletename, setdeleteName] = useState('')
 
// const [species, setSpecies] = useState([])

 const ricknmortyapi = () => {
fetch('https://api-project-production-279d.up.railway.app/residents')
.then(res => res.json())
.then(char => setData(char))

}

const handleNewName = () => {
  setRandomIndex(Math.floor(Math.random() * data.length))
}
console.log(randomIndex)

  useEffect(() => {
    ricknmortyapi()
  }, []);
 
 const updateName = async (e) => {
  e.preventDefault()
  console.log(e)
  const res = await axios.put(`https://api-project-production-279d.up.railway.app/residents/${data[randomIndex]._id}`, 
  {name: name})
  ricknmortyapi()
  console.log(res)
  }
   
  const createName = async (e) => {
    e.preventDefault()
    console.log(e)
    const res = await axios.post('https://api-project-production-279d.up.railway.app/residents',
    {name: createname})
    ricknmortyapi()
    console.log(res)
  }
  
  const deleteName = async (e) => {
    e.preventDefault()
    console.log(e)
    const res = await axios.delete(`https://api-project-production-279d.up.railway.app/residents/${data[randomIndex]._id}`,
    {name: deletename})
    ricknmortyapi()
    console.log(res)
  }

 
if (!Object.keys(data).length) return <h1>Loading...</h1>
console.log(data[0]._id)
  return (
    <div>
      <header>Rick and Morty Api</header>
      {data && data ? <h1>{data[randomIndex].name}</h1> : <h1></h1>}
      <h2></h2>
      <form onSubmit={updateName}>
      <input type='text' value={name} onChange={e => setName(e.target.value)}  />
      <input type='submit' value={'Update Character'}/>
      </form>
      <form onSubmit={createName}>
      <input type='text' value={createname} onChange={e => setcreateName(e.target.value)}/>
      <input type='submit' value={'Create Character'}/>
      </form>
      <form onSubmit={deleteName}>
      <input type='text' value={deletename} onChange={e => setdeleteName(e.target.value)}/>
      <input type='submit' value={'Delete Character'}/>
      </form>
      {/* <h2>{data.map(data => data.species)}</h2> */}
      <button onClick={handleNewName}>New name</button>
</div>
    
  );
}

export default App;

/*
useEffect(
  ()=> {
    return () => {}
  }
)
*/
// useEffect(() => console.log('setup function'))//runs and rerenders eachtime and runs this function each time

// useEffect(() => console.log(('setup function but only on mount because of empty dependecy') 
    
//   ,[])
// )
// useEffect(() => console.log(('setup function but only on mount because of empty dependency') 
    
//   ,[anotherthing])//runs function when anotherthing changes. Will rerender each time but wont fire function if anotherthing isnt effected
// )

// useEffect(() => console.log()
    
  
// )
// return () => console.log('blah')
