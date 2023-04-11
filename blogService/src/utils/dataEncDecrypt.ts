import nconf from 'nconf';
import crypto from 'crypto';

// Defining key
const key = crypto.randomBytes(32);

// Defining iv
const iv = crypto.randomBytes(16);

async function encrypt(text: string) {

  // Creating Cipheriv with its parameter
  let cipher = crypto.createCipheriv(nconf.get('encalgorithm'), Buffer.from(key), iv);

  // Updating text
  let encrypted = cipher.update(text);

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Returning iv and encrypted data
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(ivstring: string, encryptedData: string) {
  const iv = Buffer.from(ivstring, 'hex');
  const encryptedText = Buffer.from(encryptedData, 'hex');

  // Creating Decipher
  const decipher = crypto.createDecipheriv(nconf.get('encalgorithm'), Buffer.from(key), iv);

  // Updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString();
}

function createHmac(text: string) {
  const hash = crypto.createHmac(nconf.get('hashalgorithm'), nconf.get('hashKey'))
    // updating data
    .update(text)
    // Encoding to be used
    .digest('hex');
  return hash;
}

export const createToken = async (data: string) => {
  data = data.toString();
  return await encrypt(data)
};

export const decryptToken = (hash: string, data: string) => {
  const resp = decrypt(hash, data);
  return JSON.parse(resp);
};

export const generateHash = (data: string) => {
  return createHmac(data);
};

export const compareHash = (hash: string, data: string) => {
  if (hash === createHmac(data)) return true;
  else return false;
}