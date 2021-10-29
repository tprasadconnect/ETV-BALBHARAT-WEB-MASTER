import * as yup from 'yup';
import { MOBILE_REGEX } from '../../constants/validationConstants';

export const forgotPasswordSchema = yup.object().shape({
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
