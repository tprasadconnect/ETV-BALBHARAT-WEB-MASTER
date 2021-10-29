import * as yup from 'yup';
import {
  EMAIL_REGEX,
  FNAME_LNAME_REGEX,
  MOBILE_REGEX,
  PASSWORD_REGEX,
} from '../../constants/validationConstants';

export const registerSchema = yup.object().shape({
  firstname: yup
    .string()
    .required('First Name is required')
    .test('test-firstName', 'Enter Valid First Name', (value) => {
      const fname = value?.trim();
      const isValidFname = fname && FNAME_LNAME_REGEX.test(fname);
      if (!isValidFname) {
        return false;
      }
      return true;
    }),
  lastname: yup
    .string()
    .test('test-lastName', 'Enter Valid Last Name', (value) => {
      const lname = value?.trim();
      const isValidLname = lname && FNAME_LNAME_REGEX.test(lname);
      if (!isValidLname && !(isValidLname === '')) {
        return false;
      }
      return true;
    }),
  contactno: yup
    .string()
    .required('Mobile Number is required')
    .test('test-mobileNo', 'Enter Valid Mobile Number', (value) => {
      const isValidMobile = value && MOBILE_REGEX.test(value);
      if (!isValidMobile) {
        return false;
      }
      return true;
    }),
  email: yup
    .string()
    .required('Email Id is required')
    .test('test-email', 'Enter Valid Email Id', (value) => {
      const emailid = value?.trim();
      const isValidEmail = emailid && EMAIL_REGEX.test(emailid);
      if (!isValidEmail) {
        return false;
      }
      return true;
    }),
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
  terms: yup.bool().required('Please select terms'),
});

export const registerUpdateMobileSchema = yup.object().shape({
  mobileno: yup
    .string()
    .required('Mobile Number is required')
    .test('test-mobileNo', 'Enter Valid Mobile Number', (value) => {
      const isValidMobile = value && MOBILE_REGEX.test(value);
      if (!isValidMobile) {
        return false;
      }
      return true;
    }),
  newmobileno: yup
    .string()
    .required('Mobile Number is required')
    .test('test-mobileNo', 'Enter Valid Mobile Number', (value) => {
      const isValidMobile = value && MOBILE_REGEX.test(value);
      if (!isValidMobile) {
        return false;
      }
      return true;
    }),
});
