import Axios from 'axios';

export const uploadFile = async (values: any, file: any) => {
  console.log(values)
  const url1 = `http://localhost:4004/cloud/signedUrl/?userId=${Math.random().toString(36).slice(2)}`;
  const config1 = { url: url1, method: 'get', headers: { 'Content-Type': 'application/json' } }
  const uploadConfig = await Axios.post(url1, values, { headers: { 'Content-Type': 'application/json' } });
  console.log(uploadConfig.data);

  console.log('image url: ', uploadConfig.data.data.key);

  // upload to S3
  const upload = await Axios.put(uploadConfig.data.data.url, file, {
    headers: {
      'Content-Type': file.type
    }
  });

  // get presigned url from backend

  // URL for the uploaded image is 
  const preUrl = `https://my-blogster-bucket-1234.s3.ap-south-1.amazonaws.com/`
  // imageUrl: `${preUrl}uploadConfig.data.data.key`

  return async (dispatch: DispatchPostType) => {


  }
}