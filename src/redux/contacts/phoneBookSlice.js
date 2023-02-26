import { createSlice } from '@reduxjs/toolkit';
//import { nanoid } from 'nanoid';
//import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    // -----fetchContacts----------
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },

    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ------addContact-------------------
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      //state.items.push(action.payload)
      state.items = [action.payload, ...state.items];
    },
    [addContact.rejected]: handleRejected,

    // -------------deleteContact----------------
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    [deleteContact.rejected]: handleRejected,

    // ------------- updateContact --------------
    [updateContact.pending]: handlePending,
    [updateContact.fulfilled](state, action) {
      state.isLoading = false;
      state.items = state.items.map(item => {
        if (item.id === action.payload.id) {
          return {
            id: action.payload.id,
            name: action.payload.name,
            number: action.payload.number,
          };
        }
        return item;
      });
    },
    [updateContact.rejected]: handleRejected,
  },
});

//export const {addNewContact, fetchingInProgress, fetchingSuccess, fetchingError}  = phoneBookSlice.actions;

export const phoneBookReducer = phoneBookSlice.reducer;

// if (item.id === action.payload.id) {

//     item.name = action.payload.name;
//     item.number = action.payload.number;

//     return{
//         id: action.payload.id,
//         name: item.name,
//         number: item.number
//     }
// }

// return state.items

// reducers:{
//     fetchingInProgress (state){
//         state.isLoading = true;

//     },

//     fetchingSuccess(state, action){
//         state.isLoading = false;
//         state.error = null;
//         state.items = action.payload

//     },
//     fetchingError(state, action){
//             state.isLoading =  true;
//             state.error= action.payload;
//     },

//     addNewContact(state, action){
//         const name = action.payload.name;
//         const phone = action.payload.number

//         const checkContact = state.items.find(item =>item.name === name);
//         // const checkContact = contacts.some(item => item.name === name);

//         if (checkContact  !== undefined) {
//             toast.error(`${name} is already in contacts.`)
//         }else{
//             state.items.push({
//                 id: nanoid(),
//                 name,
//                 phone,
//             })
//         }

//     },
//     deleteContact(state, action){
//         const contactId = action.payload.id
//         state.contacts = state.contacts.filter(contact => contact.id !== contactId)
//     },

// }
