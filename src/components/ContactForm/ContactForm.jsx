import React, { Component } from 'react';
import classes from './ContactForm.module.css';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
  name: '',
  number: '',
  id: '',
};

export default class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    // const { name } = this.state;
    this.setState({
      id: uuidv4(),
      [target.name]: target.value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.addContact({ ...this.state });
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <form
          className={classes.container}
          action=""
          onSubmit={this.handleSubmit}
        >
          <label className={classes.label} htmlFor="name">
            Name
          </label>
          <input
            className={classes.input}
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={this.handleChange}
          />

          <label className={classes.label} htmlFor="number">
            Number
          </label>
          <input
            className={classes.input}
            type="tel"
            name="number"
            placeholder="number"
            value={number}
            onChange={this.handleChange}
          />
          <input type="submit" value="Add contact" />
        </form>
      </>
    );
  }
}
