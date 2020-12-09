
import React from 'react';
import PropTypes from 'prop-types';
import classes from "./ContactList.module.css"
import { CSSTransition, TransitionGroup } from "react-transition-group";


const ContactList = function ({ list, Delete }) {

  return (
    <>
       <TransitionGroup component="ul" className={classes.container} >
        {list.map((el) => {
          return (
              <CSSTransition key={el.id} classNames="showbutton" timeout={250}  >
            <li key={el.id} className={classes.list}>
              {el.name} : {el.number}
              <button className={classes.button} type="button" onClick={() => Delete(el.id)}>
                Удалить
              </button>
            </li>
              </CSSTransition>
          );
        })}
      </TransitionGroup>
    </>
  );
};
export default ContactList;

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
