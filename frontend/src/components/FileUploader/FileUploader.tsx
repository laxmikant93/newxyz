import React, {useState} from 'react';
import './FileUploader.scss';
import Slider from 'react-slick';

import Image1 from '../../assets/Images/image1.jpg';
import Image2 from '../../assets/Images/image2.jpg';
import Image3 from '../../assets/Images/image3.jpg';
import Image4 from '../../assets/Images/image4.jpg';
import Input from '../InputComponent/Input1/Input';
import TextArea from '../TextAreaComponent/TextArea1/TextArea';
import { uploadFile } from '../../store/upload/action';

const Settings={
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 100,
  speed: 30000,
  fade: true,
  arrows: false,
}

const FileUploader: React.FC = () => {

  const [file, setfile] = useState<any>();
  const [details, setdetails] = useState<any>({});

  const onFileChange = (event: any) => {
    if (event.target.files[0].size < 1024000) {
      setfile(event.target.files[0]);
      setdetails((prevState: any) => ({ ...prevState, extension: event.target.files[0].name.split('.').slice(-1) }));
      console.log(event.target.files[0].name.split('.').slice(-1));
    } else console.warn("file size is greater than permissible limit");
  };

  const detailsHandler = (e: any) => {
    setdetails((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }))
  };

  const uploadFileHandler = async () => {
    await uploadFile(details, file);
    console.log('Upload');
  }

  return (
    <React.Fragment>
      <div className="containerHome">
        <div className="slider-wrap">
          {/* <Slider {...Settings}>
            <img src={Image1} alt="" />
            <img src={Image2} alt="" />
            <img src={Image3} alt="" />
            <img src={Image4} alt="" />
            <img src={Image1} alt="" />
            <img src={Image2} alt="" />
          </Slider> */}
          <img src={Image1} alt="" />

        </div>
        <div className="formContainer">
          <div className="uploade-wrap bt h-47 inline-column w-100 ">
            <input
              type="file"
              id="upload"
              className="file-uploader"
              accept="*"
              onChange={(e) => onFileChange(e)}
            />
            <label htmlFor="upload" className="uploade-txt cursor">{file?.name || `Select FIle`}</label>
          </div>
          <Input 
            placeholder={'Email to'}
            type={'email'}
            label={'Email to'}
            name={'receiver'}
            value={details.receiver}
            onChange={detailsHandler}
          />
          <Input 
            placeholder={'Your Email'}
            type={'email'}
            label={'Your Email'}
            name={'sender'}
            value={details.sender}
            onChange={detailsHandler}
          />
          <Input 
            type={'text'}
            label={'Title'}
            placeholder={'Title'}
            name={'title'}
            value={details.title}
            onChange={detailsHandler}
            className={'text-input-tittle'}
          />
          <TextArea
            className={"text-Area-wrap"}
            label={'Message'}
            placeholder={'Your Message'}
            type={'text'}
            value={details.message}
            name={'message'}
            onChange={detailsHandler}
          />
          <div className="btn-wrap">
            <button className="btn-primary cursor" onClick={uploadFileHandler}>Transfer</button>
          </div>
            
        </div>
      </div>            
    </React.Fragment>
  )
}

export default FileUploader;