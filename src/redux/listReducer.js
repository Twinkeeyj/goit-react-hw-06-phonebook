import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import listAction from './listActions';

const defaultContact = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const localStore =
  JSON.parse(localStorage.getItem('contacts')) || defaultContact;

const initialState = {
  contacts: localStore,
  filter: '',
};

const newContact = (state, action) => [...state, action.payload.contact];
const removeAnyContact = (state, action) =>
  state.filter(contact => contact.id !== action.payload);

const items = createReducer(initialState.contacts, {
  [listAction.addContact]: newContact,
  [listAction.removeContact]: removeAnyContact,
});
// const items = (state = initialState.contacts, { type, payload }) => {
//   switch (type) {
//     case listAction.addContact.type:
//       return [...state, payload.contact];

//     case listAction.removeContact.type:
//       return state.filter(contact => contact.id !== payload);

//     default:
//       return state;
//   }
// };
const filter = createReducer(initialState.filter, {
  [listAction.filterContact]: (state, action) => action.payload,
});
// const filter = (state = initialState.filter, { type, payload }) => {
//   switch (type) {
//     case listAction.filterContact.type:
//       return payload;
//     default:
//       return state;
//   }
// };

export default combineReducers({ items, filter });
