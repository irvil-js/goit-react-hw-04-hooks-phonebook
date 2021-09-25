import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
import styles from './ContactForm.module.css';

function ContactForm({ onSubmit, onRepeat }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    // const id = uuidv4();

    onSubmit(name, number);
    onRepeat(name, number);

    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          placeholder="Name contact"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          className={styles.input}
          type="number"
          name="number"
          placeholder="Number contact"
          value={number}
          onChange={handleChange}
        />
      </label>

      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
