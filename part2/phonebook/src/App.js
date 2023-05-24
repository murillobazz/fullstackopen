import { useState, useEffect } from 'react';
import personService from './services/persons';

const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  )
}
const Notification = ({notification}) => {
  if (notification === null) return null;

  const notificationStyle = {
    fontSize: 24,
    color: 'green',
    backgroundColor: 'lightgrey',
    border: 'solid 1px green',
    padding: 10,
    margin: '5px 0',
    borderRadius: 100,
    width: 300,
    position: 'absolute',
    right: 0,
    top: 0,
    textAlign: 'center'
  }

  return (
    <div style={notificationStyle}>
      {notification}
    </div>
  )
}
const ErrorMessage = ({errorMessage}) => {
  if (errorMessage === null) return null;

  const errorMessageStyle = {
    fontSize: 24,
    color: 'red',
    backgroundColor: 'lightgrey',
    border: 'solid 1px red',
    padding: 10,
    margin: '5px 0',
    borderRadius: 100,
    width: 300,
    position: 'absolute',
    right: 0,
    top: 0,
    textAlign: 'center'
  }

  return (
    <div style={errorMessageStyle}>
      {errorMessage}
    </div>
  )
}
const PersonForm = (props) => {
  return (
    <div>
    <form onSubmit={props.addPerson}>
      name: <input value={props.newName} onChange={props.handleNameChange}/><br/>
      number: <input value={props.newNumber} onChange={props.handleNumberChange}/><br/>
      <button type="submit">add</button>
    </form>
  </div>
  )
}
const Persons = ({query, persons, deletePerson}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
        .map(person => 
            <p key={person.name}>
              {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
            </p>
        )
      }
    </div>
  )
}

// const errorStyle = {
//   fontSize: 24,
//   color: 'red',
//   backgroundColor: 'lightgrey',
//   border: 'solid 1px red',
//   padding: 10,
//   margin: '5px 0',
//   borderRadius: 100,
//   width: 300,
//   position: 'absolute',
//   right: 0,
//   top: 0,
//   textAlign: 'center'
// }

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value);
  }
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {setNotification(null)}, 5000);
  }
  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {setErrorMessage(null)}, 5000);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return;

      const { id } = existingPerson;

      personService
        .update(id, {...existingPerson, number: newNumber})
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response.data))
        })
        showNotification(`${existingPerson.name} entry was modified`)
    }
    else {
      personService
        .create(newPerson)
        .then(response => setPersons(persons.concat(response.data)));
        showNotification(`${newPerson.name} was added`)
    }
  }

  const deletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) return;
    personService
      .erase(person.id)
      .then(response => {
        console.log(response)
        showNotification(`${person.name} was removed`)
      })
      .catch(e => {
        console.log(e)
        showErrorMessage(`Information of ${person.name} had already been removed from the server`);
      })
    setPersons(persons.filter(e => e.id !== person.id))
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notification notification={notification} />
        <ErrorMessage errorMessage={errorMessage} />
        <Filter value={searchQuery} onChange={handleQueryChange}/>
      </div>
      <div>
        <h3>add a new</h3>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <div>
        <h3>Numbers</h3>
        <Persons query={searchQuery} persons={persons} deletePerson={deletePerson} />
      </div>
    </>
  )
}

export default App