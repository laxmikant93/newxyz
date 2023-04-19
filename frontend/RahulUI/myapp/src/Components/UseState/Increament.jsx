import React, { useState } from "react"
import '../../Components/Index.scss'

const IncreamentDecrement=()=>{

    const [state, setstate]=useState(0)

    const Increament=()=>{
        if(state<=19){
            setstate(state+1);
        }
       
    }
     
    const Decrement=()=>{
        if(state>0){
        setstate(state-1);
        }
    }

    return(
        <React.Fragment>
            <div className="flex-center wrap">
                <button className="cursor" onClick={()=>Increament()}><h1>+</h1></button>
                <p>{state}</p>
                <button className="cursor" onClick={()=>Decrement()}><h1>-</h1></button>
            </div>
        </React.Fragment>
    )
}
export default IncreamentDecrement;