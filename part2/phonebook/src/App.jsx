import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/Form'
import Persons from './components/Persons'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')


  const addNewName = (event) => {
  event.preventDefault()
  const newNameObject = {
    id: persons.length + 1,
    name: newName,
    number: newNumber

  }

  const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
  if (nameExists){
    alert(`${newName} is already added to phonebook`)
    
    return
  } else {

    setPersons(persons.concat(newNameObject))
    setNewName('')
    setNewNumber('')

  }
}



const handleNameChange = (event) => {
  event.preventDefault()
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)

}
const handleFilterChange = (event) => {
  setFilterName(event.target.value)
}

const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(
    filterName.toLowerCase()
  )
)




  return (
    <>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} /> 
      
      <h2>Add a New</h2>
      <PersonForm onSubmit={addNewName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons  personsToShow={personsToShow} />
        
    </>
  )
}

export default App