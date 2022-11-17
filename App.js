import { useState } from 'react'
import { nanoid } from 'nanoid'
import './app.css'

//AddNumber Components
const AddNumber = ({newName,newNumber,persons,setNewName,setNewNumber,setPersons,setShowStatus}) => {
  //Add a new user
  const handleChangAdd = (event) => {
    event.preventDefault()
    const found = persons.find(element => {
      return element.name === newName;
    })
    //Add a new user
    if (found) {
      const alertContent = `${newName} is already added to phonebook`
      alert(alertContent)
    } else {
      const noteObject = {
        name: newName,
        number: newNumber,
        id: nanoid(),  
      }
      setShowStatus(0)
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
      //New input box reset empty
    }
  }
  //Name input changes
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  //Number input changes
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h3>Add</h3>
        <div>name: <input value={newName} onChange={handleNameChange}/> </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/> </div>
        <button type="submit" onClick={handleChangAdd}>add</button> 
    </div>
  )
}

//FilterNumber Components
const FilterNumber =({persons, setfilterNumber, setShowStatus}) => {
  const handleFilterChange = (event) => {
    const filterName = event.target.value
    const filterItem = persons.filter( 
        (item) => {
          //if filter name equal to item
          if(item.name.toLowerCase().indexOf(filterName.toLowerCase())===0) {
              return item
            }
        }) 
    setfilterNumber(filterItem)   
    setShowStatus(1)  
  }

  return (
    <div>
      <h3>filter</h3>
      name: <input onChange={handleFilterChange}/>
    </div>
)
}

//ShownList Components
const ShownList = ({persons, setDetailNumber, setShowStatus}) => { 
  const showDetailNumber = (item) => {
    const detailNumber = [].concat(item) 
    setDetailNumber(detailNumber)
    setShowStatus(2)
  }

  return persons.map(item=>
      <div key={item.id} onClick={()=>showDetailNumber(item)} value={item}>{item.name} {item.number}</div>
  )
}

//ShowNumber Components
const ShowNumber = ({ListToShow,setShowStatus, setDetailNumber}) =>{
  return(
    <div>
      <button onClick={() => setShowStatus(0)}>All Book</button>
      <button onClick={() => setShowStatus(1)}>Filter List</button>
      <button onClick={() => setShowStatus(2)}>Details</button>
      <ShownList 
          persons={ListToShow} 
          setDetailNumber={setDetailNumber} 
          setShowStatus={setShowStatus}/>  
    </div>
  )
}
const App = () => {
  const [persons,setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Arta Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNumber, setfilterNumber] = useState([])
  const [showStatus, setShowStatus] = useState(0)
  const [DetailNumber, setDetailNumber] = useState([])

  //showList diffrent status
  const ListToShow = () => { 
    //show all number
    if ( showStatus === 0 ) { 
      return persons
    //show filter number
    } else if(showStatus === 1) {
      return filterNumber
    //show detail number
    } else if(showStatus === 2) {
      return DetailNumber
    } 
}


  return (
    <div>
      <h2>Phonebook</h2>
        <AddNumber 
            newName={newName}     setNewName={setNewName}
            newNumber={newNumber} setNewNumber={setNewNumber} 
            persons={persons}     setPersons={setPersons}    
            setShowStatus={setShowStatus}/>

        <FilterNumber 
            persons={persons}  
            setfilterNumber={setfilterNumber}
            setShowStatus={setShowStatus}/>
            
        <ShowNumber 
            ListToShow={ListToShow()} 
            setShowStatus={setShowStatus} 
            setDetailNumber={setDetailNumber} />
     </div>
  )
}

export default App