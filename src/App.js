import React, { Component } from 'react';
import Section from './components/Section';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  formSubmitHandler = contact => {
    const { contacts } = this.state;
    const { name } = contact;
    const names = contacts.map(item => item.name);

    names.includes(name)
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  onChangeFilter = event => {
    const filterValue = event.target.value;

    this.setState({ filter: filterValue });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const {
      formSubmitHandler,
      onChangeFilter,
      deleteContact,
      filterContacts,
    } = this;
    const filteredContacts = filterContacts();

    return (
      <div className={styles.wrapper}>
        <Section title="Phonebook">
          <ContactForm onSubmit={formSubmitHandler} />
        </Section>

        <Section title="Contacts">
          <Filter value={filter} onChange={onChangeFilter} />
          <ContactList contacts={filteredContacts} onClick={deleteContact} />
        </Section>
      </div>
    );
  }
}

export default App;