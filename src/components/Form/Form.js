import { nanoid } from 'nanoid';
import { Button, CrossIcon, FormContact, Input, Label } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
//import { addNewContact } from 'redux/phoneBookSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { addContact } from 'redux/contacts/operations';

const idInputName = nanoid();
const idInputNumber = nanoid();

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    //const form = e.target;
    const name = e.currentTarget.elements.name.value;
    const number = e.currentTarget.elements.number.value;

    const checkContact = contacts.find(item => item.name === name);

    if (checkContact !== undefined) {
      toast.error(`${name} is already in contacts.`);
    } else {
      dispatch(addContact({ name, number }));
      //form.reset();
      setName('');
      setNumber('');
    }
  };

  const handleClickCrossName = e => {
    setName('');
  };
  const handleClickCrossPhone = e => {
    setNumber('');
  };

  return (
    <FormContact onSubmit={handleSubmit}>
      <Label htmlFor={idInputName}>Name</Label>
      <div>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          id={idInputName}
          onChange={e => setName(e.target.value)}
        />
        <CrossIcon onClick={handleClickCrossName} />
      </div>

      <Label htmlFor={idInputNumber}>Number</Label>
      <div>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          id={idInputNumber}
          onChange={e => setNumber(e.target.value)}
        />
        <CrossIcon onClick={handleClickCrossPhone} />
      </div>

      <Button type="submit">Add Contact</Button>
    </FormContact>
  );
};
