import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('ADD_CONTACT', ({ name, number }) => ({
  payload: {
    contact: { id: uuidv4(), name, number },
  },
}));
// const addContact = ({name, number}) => ({
//   type: action.ADD,
//   payload: {
//         contact: {id: uuidv4(), name, number},
//   },
// });
const removeContact = createAction('REMOVE_CONTACT');
// const removeContact = id => ({
//   type: action.REMOVE,
//   payload: {
//     id,
//   },
// });
const filterContact = createAction('FILTER_CONTACTS');
// const filterContact = filter => ({
//   type: action.FILTER,
//   payload: filter,
// });
export default { addContact, removeContact, filterContact };
