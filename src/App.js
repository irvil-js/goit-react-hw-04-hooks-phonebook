import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Section from './components/Section';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import styles from './App.module.css';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const repeatContact = (name, number) => {
    const repeatNameAndNumber = !!contacts.find(
      contact => contact.name === name || contact.number === number,
    );

    return repeatNameAndNumber;
  };

  const addContact = (name, number) => {
    const repeat = repeatContact(name, number);
    if (name.length < 2) {
      alert(`Текст должен быть не меньше 2 символов`);
      return;
    }

    if (number.length < 5) {
      alert(`Номер должен быть не меньше 5 символов`);
      return;
    }
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    repeat
      ? alert(`${name} is already exist!`)
      : setContacts(state => [contact, ...state]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getVisibleContact = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  return (
    <div className={styles.wrapper}>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} onRepeat={repeatContact} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />

        <ContactList
          contacts={getVisibleContact()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </div>
  );
}

export default App;
