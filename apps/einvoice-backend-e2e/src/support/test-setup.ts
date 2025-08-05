import axios, { AxiosError, AxiosResponse } from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '3300';
  axios.defaults.baseURL = `http://${host}:${port}/api/v1`;
  

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      console.log(error?.response?.data);
      return Promise.resolve(error?.response);
    },
  );
};
