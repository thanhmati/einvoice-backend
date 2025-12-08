import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '3300';
  const globalPrefix = process.env.GLOBAL_PREFIX ?? 'api/v1';

  axios.defaults.baseURL = `http://${host}:${port}/${globalPrefix}`;
};
