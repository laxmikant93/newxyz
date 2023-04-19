const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const sgMail = require('@sendgrid/mail')
import nconf from 'nconf';


//////////////////////////////////////SENDGRID //////////////////////////////////

sgMail.setApiKey(nconf.get('sendgrid_key'));

export const sendEmail = async (sender: string, receiver: string, title: string, link: string, ...args: any) => {

  const msg = {
    to: receiver, // Change to your recipient
    from: 'laxmikant@edneed.com', // Change to your verified sender
    subject: title,
    text: 'and easy to do anywhere, even with Node.js',
    html: `<strong>You have received a file from ${sender}. Click <a href="${link}">here</a> to download file. 
    Message: ${args[0]} </strong>`,
  }
  sgMail
    .send(msg)
    .then((response: any) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error: Error) => {
      console.error(error)
    })
}


/////////////////////////////////////////////SEND IN BLUE //////////////////////////////////

// // Include the Sendinblue library\
// var SibApiV3Sdk = require('sib-api-v3-typescript');
// let apiInstance = new SibApiV3Sdk.AccountApi()
// apiInstance.setApiKey(SibApiV3Sdk.AccountApiApiKeys.apiKey, nconf.get('send_in_blue_key'));
// apiInstance.getAccount().then(function (data: any) {
//   console.log('API called successfully. Returned data: ' + data);
// }, function (error: any) {
//   console.error(error);
// });
// var defaultClient = SibApiV3Sdk.ApiClient.instance;
// // Instantiate the client\
// var apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = nconf.get('send_in_blue_key');

// export const sendBlueEmail = (sendermail: string, receivermail: string, title: string, link: string, ...args: any) => {
//   var apiInstance: any = new SibApiV3Sdk.EmailCampaignsApi();
//   const sender = {
//     email: 'mehul3127@gmail.com',
//     name: 'mehul',
//   }
//   const receivers = [
//     {
//       email: 'mehul.edneed@gmail.com',
//     },
//   ]
//   apiInstance
//     .sendTransacEmail({
//       sender,
//       to: receivers,
//       subject: 'Subscribe to Cules Coding to become a developer',
//       textContent: `
//     Cules Coding will teach you how to become {{params.role}} a developer.
//     `,
//       htmlContent: `
//     <h1>Cules Coding</h1>
//     <a href="https://cules-coding.vercel.app/">Visit</a>
//             `,
//       params: {
//         role: 'Frontend',
//       },
//     })
//     .then('resp', console.log)
//     .catch('error', console.log)
// };


