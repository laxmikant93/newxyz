import nconf from 'nconf';
const Axios = require('axios');

const url = nconf.get('authServiceBaseUrl');

export const verifyToken = async (hash: string, token: string) => {
  const body = JSON.stringify({ hash, token });
  const config = {
    method: 'post',
    url: `${url}verifytoken`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  };
  const tokenData = await Axios(config);
  return tokenData.data?.result ? { email: tokenData.data.decryptedData.email, userId: tokenData.data.decryptedData.userId } : {};
};