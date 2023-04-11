import crypto from 'crypto'
import nconf from 'nconf'
import fs from 'fs'
import moment from 'moment'
export default class TokenCreation {
  algo = nconf.get("algorithm")
  environment = nconf.get("env")
  privateKey = fs.readFileSync(`encryptedkeys/mykey${this.environment}.pem`, "utf8");
  publicKey = fs.readFileSync(`encryptedkeys/mypub${this.environment}.pem`, "utf8");
  public async createToken(body: any) {
    try {
      const hash = body
      let signer, token
      signer = crypto.createSign(this.algo)
      signer.update(hash)
      token = signer.sign(this.privateKey, "hex");
      return { token, hash }
    } catch (error) {
      return error;
    }
  }
  public async verifyToken(data: any) {
    let verifier, result
    const decryptedData = JSON.parse(data.decryptedmessage)
    verifier = crypto.createVerify(this.algo);
    verifier.update(data.hash);
    result = verifier.verify(this.privateKey, data.token, "hex");
    return { result, decryptedData }
  }
}
// openssl req - newkey rsa: 2048 - new - nodes - x509 - days 3650 - keyout key.pem - out cert.pem
