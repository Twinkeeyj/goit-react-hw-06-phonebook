import React, { Component } from 'react';
import classes from './ContactForm.module.css';
import { connect } from 'react-redux';
import newContact from '../../redux/listActions';
import AnswerError from '../AnswerError/AnswerError';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    isVisible: false,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const truly = this.props.list.some(
      contact => contact.name === this.state.name,
    );
    if (truly) {
      this.setState({
        isVisible: true,
      });
      setTimeout(() => {
        this.setState({
          isVisible: false,
        });
      }, 1500);
      return;
    }
    this.props.addContact({ ...this.state });
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number, isVisible } = this.state;
    return (
      <>
        <div>
          <AnswerError isVisible={isVisible} />
        </div>

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

const mapStateToProps = state => ({
  list: state.contacts.items,
});

const mapDispatchToProps = {
  addContact: newContact.addContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
