import Axios from 'axios';

const interceptor = () => {
  Axios.interceptors.request.use(
    (config) => {
      // Add token or other chanes to request object
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  Axios.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      const { status } = error.response;
      // Identify error and re-direct to corresponding page
      if (status === 401) {
        // eslint-disable-next-line no-console
        console.log('Redirect to Login');
      } else if (status === 404) {
        // eslint-disable-next-line no-console
        console.log('Redirect to Page Not Found');
      } else if (status === 403) {
        // eslint-disable-next-line no-console
        console.log('Redirect to Forbidden');
      } else if (status === 500) {
        // eslint-disable-next-line no-console
        console.log('Redirect to Interenal Server Error');
      } else {
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
};
export default {
  interceptor,
};
