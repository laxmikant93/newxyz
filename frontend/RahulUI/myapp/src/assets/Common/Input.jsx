import React from "react";
import './Input.scss'

const Input=({className,label,placeholder,type,value})=>{
    return(
        <div className={`input-wrap ${className}`}>
           <div className="emailto-wrap bt inline-column w-100 position-relative">
                <label htmlFor="emailto" className="position-absolute label-txt">{label}</label>
                <div className="inputwrap">
                    <input type={type} id="emailto" value={value} className="emailto-input " placeholder={placeholder}/>
                </div>
            </div> 
        </div>
    )
}

export default Input;

