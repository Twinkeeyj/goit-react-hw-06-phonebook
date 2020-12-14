import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './ContactList.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import listActions from '../../redux/listActions';

class ContactList extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.list !== this.props.list) {
      localStorage.setItem('contacts', JSON.stringify(this.props.list));
    }
  }
  render() {
    return (
      <>
        <TransitionGroup component="ul" className={classes.container}>
          {this.props.list.map(el => {
            return (
              <CSSTransition key={el.id} classNames="showbutton" timeout={250}>
                <li key={el.id} className={classes.list}>
                  {el.name} : {el.number}
                  <button
                    className={classes.button}
                    type="button"
                    onClick={() => this.props.Delete(el.id)}
                  >
                    Удалить
                  </button>
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </>
    );
  }
}

ContactList.propTypes = {
  Delete: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

const mapStateToProps = state => ({
  list: state.contacts.items.filter(contact =>
    contact.name.toLowerCase().includes(state.contacts.filter.toLowerCase()),
  ),
});
const mapDispatchToProps = {
  Delete: listActions.removeContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
