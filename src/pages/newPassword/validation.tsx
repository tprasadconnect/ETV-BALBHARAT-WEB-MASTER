import * as yup from 'yup';
import { PASSWORD_REGEX } from '../../constants/validationConstants';

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
