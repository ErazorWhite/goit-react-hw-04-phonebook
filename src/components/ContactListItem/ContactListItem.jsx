import {
  StyledDeleteButton,
  StyledListItem,
  StyledContactEntryBox,
} from './ContactListItem.styled';
import PropTypes from 'prop-types';

const ContactListItem = ({ name, number, deletePhoneBookEntry, id }) => {
  return (
    <StyledListItem>
      <StyledContactEntryBox>
        <span>•</span>
        <p style={{ margin: '6px 0' }}>
          {name}: {number}
        </p>
      </StyledContactEntryBox>
      <StyledDeleteButton onClick={() => deletePhoneBookEntry(id)}>
        Delete
      </StyledDeleteButton>
    </StyledListItem>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deletePhoneBookEntry: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default ContactListItem;
