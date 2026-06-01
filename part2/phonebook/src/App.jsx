import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsServices from "./services/persons";
import Notification from "./components/Notification";

// const Note = ({ note, toggleImportance }) => {
//   const label = note.important
//     ? 'make not important' : 'make important'

//   return (
//     <li>
//       {note.content}
//       <button onClick={toggleImportance}>{label}</button>
//     </li>
//   )
// }



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  useEffect(() => {
  personsServices
    .getAll()
    .then(response => {
      console.log(response.data)
      console.log(typeof response.data)
      console.log(Array.isArray(response.data))

      setPersons(response.data)
    })
}, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  const addNewName = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      person =>
        person.name.toLowerCase() === newName.toLowerCase()
    );

    // ACTUALIZAR
    if (existingPerson) {

      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {

        const changedPerson = {
          ...existingPerson,
          number: newNumber,
        };

        personsServices
          .update(existingPerson.id, changedPerson)
          .then(response => {

            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id
                  ? person
                  : response.data
              )
            );

            setMessage({
              message: `Changed number of ${response.data.name}`,
              type: "success",
            });

            setTimeout(() => {
              setMessage(null);
            }, 5000);

            setNewName("");
            setNewNumber("");
          })

          .catch(error => {

            setMessage({
              message: `Information of ${existingPerson.name} has already been removed from server`,
              type: "error",
            });

            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }

      return;
    }

    // SI NO EXISTE -> CREAR
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsServices
      .create(newPerson)

      .then(response => {

        setPersons(persons.concat(response.data));

        setMessage({
          message: `Added ${response.data.name}`,
          type: "success",
        });

        setTimeout(() => {
          setMessage(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      })

      .catch(error => {

        setMessage({
          message: "Failed to add person",
          type: "error",
        });

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const removePerson = (id) => {

    const person = persons.find(p => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {

      personsServices
        .remove(id)
        .then(() => {
          setPersons(
            persons.filter(person => person.id !== id)
          );

          setMessage({
            message: `Deleted ${person.name}`,
            type: "success",
          });

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })

        .catch(error => {
          setMessage({
            message: `Information of ${person.name} has already been removed from server`,
            type: "error",
          });

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase()),
  );

  const toggleImportanceOf = (id) => {
    console.log("importance of " + id + " needs to be toggled");
  };

  return (
    <>
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      
      <h2>Phonebook</h2>
      <Notification message={message} />
      <h2>filter shown with:</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <br /> <br />
      <h2>Add a New</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addNewName={addNewName}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <ul key={person.id}>
          <li>
            {person.name} {person.number}
            <button onClick={() => removePerson(person.id)}>delete</button>
          </li>
        </ul>
      ))}
      {/* <Note note={notes[0]} toggleImportance={toggleImportance} /> */}
    </>
  );
};

export default App;
