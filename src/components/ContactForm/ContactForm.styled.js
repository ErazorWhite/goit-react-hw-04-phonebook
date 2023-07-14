import { styled } from 'styled-components';
import { Form, Field } from 'formik';
import MaskedInput from 'react-text-mask';

export const FormConstolsContainer = styled.div`
  border: 1px solid black;
  padding: 20px;
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 200px;
  font-size: 1.2em;
  font-weight: 500;
`;

export const StyledForm = styled(Form)`
  max-width: 500px;
`;

export const StyledField = styled(Field)`
  border: 1px solid #c0c0c0;
  padding: 5px;
`;

export const StyledMaskedInput = styled(MaskedInput)`
  border: 1px solid #c0c0c0;
  padding: 5px;
`;

export const FieldContainer = styled.div`
  margin-bottom: 20px;
`;

export const StyledErrorMessage = styled.div`
  font-size: 0.8em;
  color: red;
`;

export const StyledListItem = styled.li`
  font-size: 1em;
  font-weight: 500;
`;

export const StyledSubmitButton = styled.button`
  background-color: white;
  border: 1px solid #c0c0c0;
  border-radius: 5%;
  padding: 5px 10px;
  font-weight: 600;
  transition: background-color ease-in 250ms;

  &:hover,
  &:focus {
    background-color: aquamarine;
  }
`;
