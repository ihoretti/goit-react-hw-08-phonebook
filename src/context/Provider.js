import { useState } from 'react';
import createContext from './context';

export const ProviderCtx = ({ children }) => {
  const [favContacts, setFavContacts] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [contactId, setContactId] = useState('');

  const providerValue = {
    favContacts,
    setFavContacts,
    isOpenModal,
    setIsOpenModal,
    contactId,
    setContactId,
  };

  return (
    <createContext.Provider value={providerValue}>
      {children}
    </createContext.Provider>
  );
};
