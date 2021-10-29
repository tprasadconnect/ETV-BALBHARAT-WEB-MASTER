import * as yup from 'yup';
import {
  MOBILE_REGEX,
  PASSWORD_REGEX,
} from '../../../constants/validationConstants';

export const accountForgotPasswordSchema = yup.object().shape({
  mobileno: yup
    .string()
    .required('Mobile Number is required')
    .test('test-mobileNo', 'Enter Valid Number', (value) => {
      const isValidMobile = value && MOBILE_REGEX.test(value);
      if (!isValidMobile) {
        return false;
      }
      return true;
    }),
});

export const newPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .test('test-password', 'Enter Valid Password', (value) => {
      const isValidPassword = value && PASSWORD_REGEX.test(value);
      if (!isValidPassword) {
        return false;
      }
      return true;
    }),
  confirmPassword: yup
    .string()
    .required('Confirmation Password is a required')
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
});
