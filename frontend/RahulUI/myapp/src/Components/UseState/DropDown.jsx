import React, { useEffect, useRef, useState } from "react";
import '../Index.scss'


let data=["shirt","pant","pot","glass","plate"]
const DropDown=()=>{

    const [isOpen, setIsOpen] = useState(false);
    const [value,setvalue]=useState(null)

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
          }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [dropdownRef]);
    
      const handlevalue=(index)=>{
        setvalue(index)
        setIsOpen(!isOpen)
      }
    
    
    return(
        <div className="dropdownContainer " ref={dropdownRef}>
            <div className="DropDownBtn cursor" onClick={() => setIsOpen(!isOpen)}> 
                <p className="btn-txt">{value?value:"select category"}</p>
            </div>
            {
                isOpen &&
                <div className="DropDownSelector" >
                {data.map((e)=>{
                    return(
                        <>
                        <p className="selectTxt" onClick={()=>handlevalue(e)}>{e}</p>
                        </>
                    )
                })}     
                </div>
            }
        </div>
    )
}
export default DropDown;