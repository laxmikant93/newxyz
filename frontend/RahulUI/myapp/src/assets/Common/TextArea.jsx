import React from "react";


const TextArea=({label,className,placeholder})=>{
    return(
        <div className ={`textArea-Container ${className}`}>
           <div className="messagge-field inline-column w-100 position-relative">
                <label htmlFor="message" className="position-absolute label-message">{label}</label>
                <div className="text-Input-wrap">
                <textarea id="message" rows={3}  className="messagge-input" placeholder={placeholder}></textarea>
                </div>
            </div>
        </div>
    )
}

export default TextArea;