import crypto, { generateKeyPairSync, randomBytes, } from 'crypto'
import nconf from 'nconf'
import fs from 'fs'
export default class PemKeys {
  // openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
  public async generatePemKey() {
    const environment = nconf.get("env")
    const cipherkey = randomBytes(32);
    const cipheriv = randomBytes(16)
    const { publicKey, privateKey } = generateKeyPairSync('rsa',
      {
        modulusLength: 1600,  // the length of your key in bits   
        publicKeyEncoding: {
          type: 'spki',       // recommended to be 'spki' by the Node.js docs
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',      // recommended to be 'pkcs8' by the Node.js docs
          format: 'pem',
          // cipher: 'aes-256-cbc',   // *optional*
          // passphrase: 'top secret' // *optional*   
        }
      });
    fs.writeFileSync(`encryptedkeys/mykey${environment}.pem`, privateKey)
    fs.writeFileSync(`encryptedkeys/mypub${environment}.pem`, publicKey)
    fs.writeFileSync(`encryptedkeys/iv${environment}`, cipheriv)
    fs.writeFileSync(`encryptedkeys/key${environment}`, cipherkey)
    return "keys updated"
  }

}
