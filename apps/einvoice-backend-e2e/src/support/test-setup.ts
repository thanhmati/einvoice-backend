import axios, { AxiosError, AxiosResponse } from 'axios';
import { getAccessToken } from './shared';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '3300';
  const baseUrl = `http://${host}:${port}/api/v1`;

  axios.defaults.baseURL = baseUrl;

  const accessToken = await getAccessToken();

  console.log('accessToken', accessToken);

  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

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
