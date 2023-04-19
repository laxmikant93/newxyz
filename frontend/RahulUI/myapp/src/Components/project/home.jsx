import React from "react";
import './index.scss'
import Slider from 'react-slick';

import Image1 from '../../assets/Images/image1.jpg'
import Image2 from '../../assets/Images/image2.jpg'
import Image3 from '../../assets/Images/image3.jpg'
import Image4 from '../../assets/Images/image4.jpg'
import Input from "../../assets/Common/Input";
import TextArea from "../../assets/Common/TextArea";
import Header from "./Header";

const Home=()=>{

    const Settings={
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 100,
        speed: 30000,
        fade: true
    }

    return(
        <React.Fragment>
            <div className="containerHome">
                <div className="slider-wrap">
                <Slider {...Settings}>
                    <img src={Image1} alt="" />
                    <img src={Image2} alt="" />
                    <img src={Image3} alt="" />
                    <img src={Image4} alt="" />
                    <img src={Image1} alt="" />
                    <img src={Image2} alt="" />
                </Slider>
                </div>
                <div className="formContainer">
                    <div className="uploade-wrap bt h-47 inline-column w-100 ">
                        <input type="file" id="upload"  className="file-uploader"/>
                        <label htmlFor="upload" className="uploade-txt cursor">Select FIle</label>
                    </div>
                    <Input 
                        placeholder={'Email to'}
                        type={'email'}
                        label={'Email to'}
                    />
                    <Input 
                        placeholder={'Your Email'}
                        type={'email'}
                        label={'Your Email'}
                    />
                    <Input 
                        type={'text'}
                        label={'Tittle'}
                        value={""}
                        className={'text-input-tittle'}
                    />
                   
                   <TextArea
                        className={"text-Area-wrap"}
                        placeholder={'Your Message'}
                        type={'text'}
                        label={'Message'}
                   />

                   <div className="btn-wrap">
                        <button className="btn-primary cursor">Transfer</button>
                    </div>
                    
                </div>
            </div>            
        </React.Fragment>
    )
}

export default Home;