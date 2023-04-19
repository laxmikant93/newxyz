import React, { useState } from "react";
import '../Index.scss'

const Form =()=>{
    const[name,setName]=useState("");
    const[number,setnumber]=useState("");
    const[Email,setEmail]=useState("");
    const[Address,setAddress]=useState("");
    const [isActive, setActive]=useState(false)

    const handleChange=(e)=>{
        setName(e.target.value)
    }

    const handlenumber=(e)=>{
        if(e.target.value.length<=10){
            setnumber(e.target.value)
        }
    }

    console.log(number)
    
    const handleEmail=(e)=>{
        setEmail(e.target.value)
    } 
    const handleAddress=(e)=>{
        setAddress(e.target.value)
    }
    const handleSave=()=>{
        if(name&&Address&&Email&&number){

            setActive(true)

        }else if(name&&Address&&Email){
            alert("number Invalid Field")
        }else if(name&&Address&&number){
            alert("Email Invalid Field")
        }else if(name&&number&&Email){
            alert("Address Invalid Field")
        }else if(number&&Address&&Email){
            alert("Name Invalid Field")
        }else if(name){
            alert("Address,Email,Number Invalid Field")
        }else if(Address){
            alert("Name,number,Email, Invalid Field")
        }else if(Email){
            alert("Address,number,Name, Invalid Field")
        }else if(number){
            alert("Address,Email,Name Invalid Field")
        }else if(number&&Address){
            alert("Name, Email Invalid fields")
        }else if(name&&Address){
            alert("Number, Email Invalid fields")
        }else if(Email&&Address){
            alert("Name, Number Invalid fields")
        }else if(name&&Email){
            alert("Address, Number Invalid fields")
        }else if(name&&number){
            alert("Address, Email Invalid fields")
        }else if(number&&Email){
            alert("Name, Address Invalid fields")
        }else{
            alert('invalid')
        }
        
    }

    return(
        <React.Fragment>
           <div action="" className="formContainer">
            <div className="form-wrap">
                <input type="text" value={name} onChange={(e)=>handleChange(e)} placeholder="Enter your name" required />
                <input type="number" name="phone" maxLength={"10"} pattern="\d{10}"   placeholder="Enter your mob. no." value={number} onChange={(e)=>handlenumber(e)}required />
                <input type="email" placeholder="Enter your email" value={Email} onChange={(e)=>handleEmail(e)} required/>
                <textarea placeholder="Enter your address" id="" cols="30" rows="10" value={Address} onChange={(e)=>handleAddress(e)} required></textarea>
                <button className="btnSave cursor" onClick={()=>handleSave()}>save</button>
                <button className="btnSave cursor" onClick={()=>setActive(false)}>Cancel</button>
            </div>
            {
                isActive&&
            <div className="value-wrap">
                <p>Name: {name}</p>   
                <p>Mobile: {number}</p>
                <p>Email: {Email}</p>
                <p>Address: {Address}</p>
            </div>
            }
           </div>
           
        </React.Fragment>
    )
}

export default Form;