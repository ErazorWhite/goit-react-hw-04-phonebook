import React from 'react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { StyledSearchByNameInput } from './Filter.styled';

const Filter = ({ onChange }) => (
  <label htmlFor="searchByName">
    <p>Find contacts by name</p>
    <StyledSearchByNameInput
      type="text"
      name="searchByName"
      style={{ padding: '5px' }}
      onChange={debounce(onChange, 700)}
    />
  </label>
);

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
