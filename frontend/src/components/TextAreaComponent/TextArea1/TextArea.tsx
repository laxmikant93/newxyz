import React from "react";

type Props = {
  className?: string | null,
  label?: string | null,
  placeholder?: string | undefined,
  type?: string | React.HTMLInputTypeAttribute | undefined,
  value?: string | number | string[] | undefined,
  name?: string | undefined,
  onChange?: (e: any) => void
};

const TextArea: React.FC<Props> = ({label,className,placeholder,type, name, onChange})=>{
    return(
        <div className ={`textArea-Container ${className}`}>
           <div className="messagge-field inline-column w-100 position-relative">
                <label htmlFor="message" className="position-absolute label-message">{label}</label>
                <div className="text-Input-wrap">
                <textarea id="message" rows={3} onChange={onChange} name={name}  className="messagge-input" placeholder={placeholder}></textarea>
                </div>
            </div>
        </div>
    )
}

export default TextArea;