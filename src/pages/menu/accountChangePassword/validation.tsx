import * as yup from 'yup';
import { PASSWORD_REGEX } from '../../../constants/validationConstants';

export const accountChangePasswordSchema = yup.object().shape({
  oldpassword: yup
    .string()
    .required('Password is required')
    .test('test-password', 'Enter Valid Password', (value) => {
      const isValidPassword = value && PASSWORD_REGEX.test(value);
      if (!isValidPassword) {
        return false;
      }
      return true;
    }),
  newpassword: yup
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
    .oneOf([yup.ref('newpassword'), ''], 'Passwords must match'),
});
