import React from "react";
import './Input.scss'

type Props = {
  className?: string | null,
  label?: string | null,
  placeholder?: string | undefined,
  type?: string | React.HTMLInputTypeAttribute | undefined,
  value?: string | number | string[] | undefined,
  name?: string | undefined,
  onChange?: (e: any) => void
}

const Input: React.FC<Props> =({className,label,placeholder,type,value, name, onChange})=>{
    return(
        <div className={`input-wrap ${className}`}>
           <div className="emailto-wrap bt inline-column w-100 position-relative">
                <label htmlFor="emailto" className="position-absolute label-txt">{label}</label>
                <div className="inputwrap">
                    <input type={type} id="emailto" value={value} name={ name} className="emailto-input " placeholder={placeholder} onChange={onChange} />
                </div>
            </div> 
        </div>
    )
}

export default Input;