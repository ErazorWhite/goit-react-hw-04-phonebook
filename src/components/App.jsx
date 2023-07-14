import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { save, load } from '../localStorage';

const PB_KEY = 'phonebook_item_index';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = load(PB_KEY);
    this.setState({ contacts: savedContacts || [] });
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      save(PB_KEY, contacts);
    }
  }

  createPhoneBookEntry = data => {
    const normalizedData = data.name.toLowerCase();
    const { contacts } = this.state;
    if (contacts.some(({ name }) => name.toLowerCase() === normalizedData)) {
      Notify.failure('Such a contact already exists!');
      return;
    }

    const newPhoneBookEntry = {
      ...data,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newPhoneBookEntry],
    }));
  };

  deletePhoneBookEntry = entryId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== entryId),
    }));
  };

  handleSearchByName = ({ target: { value } }) => {
    this.searchContactByName(value);
  };

  searchContactByName = contactName => {
    this.setState({ filter: contactName });
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div style={{ padding: '20px' }}>
        <h1>Phonebook</h1>
        <ContactForm createPhoneBookEntry={this.createPhoneBookEntry} />
        <h2>Contacts</h2>
        {this.state.contacts.length ? (
          <>
            <Filter onChange={this.handleSearchByName} />
            <ContactList
              contacts={filteredContacts}
              deletePhoneBookEntry={this.deletePhoneBookEntry}
            />
          </>
        ) : (
          <p>There are no contacts!</p>
        )}
      </div>
    );
  }
}
