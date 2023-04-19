import nconf from 'nconf';
import { sendEmail } from '../services/mailer';

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
// const requireLogin = require('../middlewares/requireLogin');
// const keys = require('../config/keys');

AWS.config.update({
  region: "ap-south-1",
  "accessKeyId": nconf.get('accessKeyId'),
  "secretAccessKey": nconf.get('secretAccessKey')
});

const s3 = new AWS.S3(
  // {
  //   accessKeyId: keys.accessKeyId,
  //   secretAccessKey: keys.secretAccessKey
  // }
);


export default class UploadController {
  public async getSignedUrl(userId: any, data: any) {
    try {
      let resp: any = { msg: 'file not sent' };
      if (userId) {
        const key = `${userId}/${uuidv4()}.${data.extension}`;
        const url = await s3.getSignedUrl('putObject', {
          Bucket: 'my-blogster-bucket-1234',
          ContentType: 'image/jpeg',
          Key: key
        });
        resp = { key, url };
        if (data?.sender && data.receiver) {
          console.log(data.sender, data.receiver, data.title, url);
          await sendEmail(data.sender, data.receiver, data.title, nconf.get('s3_base_url') + key, data.message);
        };
      }
      return resp;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

}