import * as yup from 'yup';
import { NAME_REGEX } from '../../constants/validationConstants';

export interface IBasicDetail {
  kidfirstname: string;
  month: string;
  year: string;
}

export const profileBasicSchema = yup.object().shape({
  kidfirstname: yup
    .string()
    .required('kidNameIsRequired')
    .test('test-name', 'invalidKidName', (value) => {
      const name = value?.trim();
      const isValidName = name && NAME_REGEX.test(name);
      if (!isValidName) {
        return false;
      }
      return true;
    }),
  month: yup
    .string()
    .required('monthIsRequired')
    // eslint-disable-next-line func-names
    .test('test-dobValidation', 'pleaseSelectAValidMonth', function (data) {
      const { year } = this.parent;
      const date = new Date();
      const month = data || '';
      if (
        date.getMonth() <= parseInt(month, 10) &&
        parseInt(year, 10) === date.getFullYear()
      ) {
        return false;
      }
      return true;
    }),
  year: yup.string().required('yearIsRequired'),
});
