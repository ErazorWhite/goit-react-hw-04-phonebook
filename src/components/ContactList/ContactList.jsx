import ContactListItem from 'components/ContactListItem/ContactListItem';
import { StyledUnorderedList } from './ContactList.styled';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, deletePhoneBookEntry }) => {
  return (
    <>
      <StyledUnorderedList>
        {contacts.map(({ id, name, number }) => (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            deletePhoneBookEntry={deletePhoneBookEntry}
          />
        ))}
      </StyledUnorderedList>
    </>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deletePhoneBookEntry: PropTypes.func.isRequired,
};
