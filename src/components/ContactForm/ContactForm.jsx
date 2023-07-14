import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {
  FormConstolsContainer,
  StyledForm,
  StyledField,
  FieldContainer,
  StyledLabel,
  StyledErrorMessage,
  StyledSubmitButton,
  StyledMaskedInput, // Франкенштейн из Masked + Styled, который под капотом ещё наверное Field от формика инкапсулирует
} from './ContactForm.styled';

// Инпут маска для номера телефона
const phoneNumberMask = [
  '+',
  /[1-9]/,
  /\d/,
  '(',
  /[0-9]/,
  /\d/,
  /\d/,
  ')',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
];

// Благодаря Formik мы ушли от state и юзаем вот эти значения для инициализации
// Вынес их в объект для удобства
const initialValues = {
  name: '',
  number: '',
};

// Схема для валидации yup
const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Too short!')
    .max(32, 'Too long!')
    .notOneOf(['1234567890'], 'Invalid name') 
    .matches(/^[a-zA-Z\s]+$/, 'Invalid name')
    .required('Required!'),
  number: yup
    .string()
    .matches(/^\+?\d{1,3}\(\d{3}\)\d{2}-\d{2}-\d{3}$/, 'Invalid phone number')
    .required('Required!'),
});

// Далее идёт компонент формы
const ContactForm = ({ createPhoneBookEntry }) => {
  const handleSubmit = (values, { resetForm }) => {
      createPhoneBookEntry({...values});
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <StyledForm>
        <FormConstolsContainer>
          <StyledLabel htmlFor="name">
            Name
            <FieldContainer>
              <StyledField
                type="text"
                name="name"
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component={StyledErrorMessage} />
            </FieldContainer>
          </StyledLabel>

          <StyledLabel htmlFor="number">
            Number
            <FieldContainer>
              <StyledField name="number">
                {({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    mask={phoneNumberMask}
                    placeholder="Enter phone number"
                    id="number"
                    type="text"
                    // component="input"
                    // ^ Тут пришлось убрать component="input". Если его добавить, то React начнёт слать варнинг.
                    // К счастью, по умолчанию InputMask итак использует input.
                    // Но если бы нужно было вставить другой тег, то это вызвало бы головную боль.
                    // Вроде, это как-то решается через <StyleSheetManager shouldForwardProp={(prop) => prop !== 'component'}>
                  />
                )}
              </StyledField>
              <ErrorMessage name="number" component={StyledErrorMessage} />
            </FieldContainer>
          </StyledLabel>
          <div>
            <StyledSubmitButton type="submit">Add Contact</StyledSubmitButton>
          </div>
        </FormConstolsContainer>
      </StyledForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  createPhoneBookEntry: PropTypes.func.isRequired,
};

export default ContactForm;
