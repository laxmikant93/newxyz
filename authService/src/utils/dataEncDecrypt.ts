import express from "express";
import crypto, { createDecipheriv, randomBytes } from 'crypto';
import fs from "fs";
import moment from "moment";
import nconf from 'nconf';

const algo = nconf.get("algorithm")
const environment = nconf.get("env")
const privateKey = fs.readFileSync(`encryptedkeys/mykey${environment}.pem`, "utf8");
const publicKey = fs.readFileSync(`encryptedkeys/mypub${environment}.pem`, "utf8");


// ENCRYPTION DECRYPTION METHOD

export async function createToken(body: any) {
  try {
    const hash = await encrypt(body);
    let signer, token;
    signer = crypto.createSign(algo);
    signer.update(hash);
    token = signer.sign(privateKey, "hex");
    return { token, hash }
  } catch (error) {
    return error;
  }
}

export async function verifyToken(body: any) {
  const data = await decrypt(body);
  let verifier, result
  const decryptedData = JSON.parse(data.decryptedMessage);
  verifier = crypto.createVerify(algo);
  verifier.update(data.hash);
  result = verifier.verify(privateKey, data.token, "hex");
  return { result, decryptedData }
}

const encrypt = async (body: any) => {
  const environment = nconf.get("env");
  const userData = {
    email: body.email,
    userId: body.userId,
    createdAt: moment().unix(),
    expiryAt: moment().unix() + 28800
  };
  const iv = fs.readFileSync(`encryptedkeys/iv${environment}`);
  const key = fs.readFileSync(`encryptedkeys/key${environment}`);
  let cipher = crypto.createCipheriv("aes256", key, iv);
  let encrypted = cipher.update(JSON.stringify(userData), 'utf8', 'hex') + cipher.final('hex');
  return encrypted;
}

const decrypt = async (body: any) => {
  const hash = body.hash;
  const environment = nconf.get("env");
  const iv = fs.readFileSync(`encryptedkeys/iv${environment}`);
  const key = fs.readFileSync(`encryptedkeys/key${environment}`);
  let decipher = createDecipheriv('aes256', key, iv);
  let decryptedMessage: any
  try {
    decryptedMessage = decipher.update(hash, 'hex', 'utf-8') + decipher.final('utf8');
  } catch (error) {
    return "unauthorized";
  }
  let cTimestamp = JSON.parse(decryptedMessage);
  cTimestamp = cTimestamp.createdAt + 10 * 24 * 60 * 60; //days, hours or minutes in secoonds
  const exTimestamp = moment().unix();
  if (cTimestamp < exTimestamp) {
    return "unauthorized";
  } else {
    body.decryptedMessage = decryptedMessage;
    return body;
  }
}


// HASHING METHOD

function createHmac(text: string) {
  const hash = crypto.createHmac(nconf.get('hashalgorithm'), nconf.get('hashKey'))
    // updating data
    .update(text)
    // Encoding to be used
    .digest('hex');
  return hash;
}

export const generateHash = (data: string) => {
  return createHmac(data);
};

export const compareHash = (hash: string, data: string) => {
  if (hash === createHmac(data)) return true;
  else return false;
}