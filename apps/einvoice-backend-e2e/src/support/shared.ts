import { randomStringNumber } from '@common/utils/string.utils';
import axios from 'axios';
import { ObjectId } from 'mongodb';

export const getAccessToken = async () => {
  const email = `thanh.do+${randomStringNumber(4)}@mati.com.vn`;
  const password = '123456';

  await axios.post('/user', {
    firstName: 'Do',
    lastName: 'Thanh',
    email,
    password,
    roles: [new ObjectId()],
  });

  const { data } = await axios.post('/authorizer/login', {
    username: email,
    password,
  });

  return data.data.accessToken;
};
