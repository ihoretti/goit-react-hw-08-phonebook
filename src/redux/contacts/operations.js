import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
//import { fetchingError, fetchingInProgress, fetchingSuccess } from "./phoneBookSlice";

//axios.defaults.baseURL = 'https://63ef803c271439b7fe6fe1e6.mockapi.io/api/v1'
//axios.defaults.baseURL = 'https://connections-api.herokuapp.com'

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get('/contacts');
      const data = resp.data;

      const sortByName = data.sort((a, b) => a.name.localeCompare(b.name));
      return sortByName;
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    console.log('contact', contact);

    try {
      const resp = await axios.post('/contacts', contact);
      return resp.data;
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const resp = await axios.delete(`/contacts/${contactId}`);
      return resp.data;
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async (editedContact, thunkAPI) => {
    const { contactId, name, number } = editedContact;
    try {
      const resp = await axios.patch(`/contacts/${contactId}`, {
        name,
        number,
      });
      console.log('resp.data', resp);
      return resp.data;
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// export const fetchContacts = () => async dispatch =>{
//     try {
//         dispatch(fetchingInProgress());
//         const resp = await axios.get('/contacts');
//         dispatch(fetchingSuccess(resp.data))

//     } catch (e) {
//         dispatch(fetchingError(e.message))
//     }
// }

// export const addContact = newContact => async dispatch =>{

//     try {

//         const response = await axios.post("/contacts", newContact );
//         return  response

//     } catch (error) {

//     }

// }
