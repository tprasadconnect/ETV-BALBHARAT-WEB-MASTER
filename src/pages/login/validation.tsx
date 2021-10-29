import * as yup from 'yup';
import { MOBILE_REGEX } from '../../constants/validationConstants';

export const loginSchema = yup.object().shape({
  contactno: yup
    .string()
    .required('mobileNumberRequired')
    .test('test-mobileNo', 'enterValidNumber', (value) => {
      const isValidMobile = value && MOBILE_REGEX.test(value);
      if (!isValidMobile) {
        return false;
      }
      return true;
    }),
  password: yup.string().required('passwordRequired'),
});

export const socialSchema = yup.object().shape({
  contactno: yup
    .string()
    .required('Mobile Number is required')
    .test('test-contactno', 'Enter Valid Number', (value) => {
      const isValidMobile = value && MOBILE_REGEX.test(value);
      if (!isValidMobile) {
        return false;
      }
      return true;
    }),
});
