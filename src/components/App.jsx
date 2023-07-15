import { useMemo, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocalStorage } from './service/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const createPhoneBookEntry = data => {
    const normalizedData = data.name.toLowerCase();
    if (contacts.some(({ name }) => name.toLowerCase() === normalizedData)) {
      toast('Such a contact already exists!');
      return;
    }

    const newPhoneBookEntry = {
      ...data,
      id: nanoid(),
    };

    setContacts(prevContacts => [...prevContacts, newPhoneBookEntry]);
  };

  const deletePhoneBookEntry = entryId => {
    setContacts(prevContacts =>
      prevContacts.filter(prevContact => prevContact.id !== entryId)
    );
  };

  const handleSearchByName = ({ target: { value } }) => {
    searchContactByName(value);
  };

  const searchContactByName = contactName => {
    setFilter(contactName);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = useMemo(() => (contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  )), [contacts, normalizedFilter]);

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer />
      <h1>Phonebook</h1>
      <ContactForm createPhoneBookEntry={createPhoneBookEntry} />
      <h2>Contacts</h2>
      {contacts.length ? (
        <>
          <Filter onChange={handleSearchByName} />
          <ContactList
            contacts={filteredContacts}
            deletePhoneBookEntry={deletePhoneBookEntry}
          />
        </>
      ) : (
        <p>There are no contacts!</p>
      )}
    </div>
  );
};
