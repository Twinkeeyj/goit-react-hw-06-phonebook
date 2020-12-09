import React, { Component } from 'react';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import classes from './App.module.css';
import { CSSTransition } from 'react-transition-group';
import AnswerError from './components/AnswerError/AnswerError';

const contactList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const ERROR = {
  isVisible: false,
  answer: 'Such a contact is already in the list!',
};

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    ...ERROR,
  };
  componentDidMount() {
    const persistedTask = localStorage.getItem('contacts') ;
    if (persistedTask === null ) {
      this.setState({
        contacts: contactList,
      });

    } else if (persistedTask) {
      this.setState({
        contacts: JSON.parse(persistedTask),
      });
    }
     }
  componentDidUpdate(prevProps, prevState) {
   if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

  }
  toAddContact = el => {
    const truly = this.state.contacts.find(contact => contact.name === el.name);
    if (truly) {
      this.setState({
        isVisible: true,
      });
      setTimeout(() => {
        this.setState({
          ...ERROR,
        });
      }, 1500);
    } else if (el.name.length >= 1) {
      this.setState(prev => {
        const updateState = [...prev.contacts, el];
        return { contacts: updateState };
      });
    }
  };
  filterRender = filter => {
    this.setState({ filter });
  };
  filtresTask() {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }
  toDeleteContact = id => {
    const { contacts } = this.state;
    const obj = contacts.find(el => el.id === id);
    const index = contacts.indexOf(obj);
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts.slice(0, index),
        ...prevState.contacts.slice(index + 1),
      ],
    }));
  };
  render() {
    const { contacts, filter, isVisible, answer } = this.state;
    const filterText = this.filtresTask();

    return (

      <>
        <div className={classes.container}>
          <CSSTransition
            in={true}
            classNames="logo"
            timeout={250}
            appear={true}
            unmountOnExit
          >
            <h1>Phonebook</h1>
          </CSSTransition>
          <ContactForm addContact={this.toAddContact} />
          <h2>Contacts</h2>
          {contacts.length >0 && (
            <Filter value={filter} filterRender={this.filterRender} />
          )}
          <ContactList list={filterText} Delete={this.toDeleteContact} />
          <CSSTransition
            in={isVisible}
            timeout={250}
            unmountOnExit
            classNames="answer"
          >
            <AnswerError answer={answer} />
          </CSSTransition>
        </div>
      </>
    );
  }
}
