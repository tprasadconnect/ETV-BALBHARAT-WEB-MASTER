import * as yup from 'yup';
import {
  FNAME_LNAME_REGEX,
  MOBILE_REGEX,
  NAME_REGEX,
} from '../../../constants/validationConstants';

export const editParentProfileSchema = yup.object().shape({
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
});

export const verifymobileSchema = yup.object().shape({
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
  newmobileno: yup
    .string()
    .required('New Mobile Number is required')
    .test('test-mobileNo', 'Enter Valid Number', (value) => {
      const isValidMobile = value && MOBILE_REGEX.test(value);
      if (!isValidMobile) {
        return false;
      }
      return true;
    }),
});

export const editChildAccounntSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .test('test-name', 'Invalid Name', (value) => {
      const name = value?.trim();
      const isValidName = name && NAME_REGEX.test(name);
      if (!isValidName) {
        return false;
      }
      return true;
    }),
  month: yup
    .string()
    .required('Month is required')
    // eslint-disable-next-line func-names
    .test('test-dobValidation', 'Please select a valid month', function (data) {
      const { year } = this.parent;
      const date = new Date();
      const month = data || '';
      if (
        // eslint-disable-next-line radix
        date.getMonth() <= parseInt(month) &&
        // eslint-disable-next-line radix
        parseInt(year) === date.getFullYear()
      ) {
        return false;
      }
      return true;
    }),
  year: yup.string().required('Year is required'),
});
