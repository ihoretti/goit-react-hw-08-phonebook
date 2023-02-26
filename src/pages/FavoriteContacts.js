import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { deleteContact } from 'redux/contacts/operations';
import { EditModal } from 'components/editModal/EditModal';
import createContext from '.././context/context';

import { MdFavorite } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { AiTwotoneDelete } from 'react-icons/ai';

import css from 'components/ContactList/ContactList.module.css';

export const FavoriteContacts = ({ removeFav }) => {
  const dispatch = useDispatch();
  const { favContacts, isOpenModal, setIsOpenModal, setContactId } =
    useContext(createContext);

  const handleRemoveFav = id => {
    removeFav(id);
  };
  const handleEditContact = id => {
    setContactId(id);
    setIsOpenModal(true);
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
    handleRemoveFav(id);
  };

  return (
    <ul className={css.list}>
      {favContacts.length === 0 ? (
        <p>You have no favorite contacts</p>
      ) : (
        favContacts.map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            {name}: {number}
            <button
              className={css.editBtn}
              onClick={() => handleEditContact(id)}
            >
              <AiFillEdit />
            </button>
            <button
              className={css.delBtn}
              onClick={() => handleDeleteContact(id)}
            >
              <AiTwotoneDelete />
            </button>
            <button
              className={css.buttonFav}
              onClick={() => handleRemoveFav(id)}
            >
              <MdFavorite />
            </button>
          </li>
        ))
      )}
      {isOpenModal && <EditModal />}
    </ul>
  );
};
