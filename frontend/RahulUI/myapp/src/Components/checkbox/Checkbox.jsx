import React from "react";
import { useState } from "react";


const CheckBox=()=>{

    // const[state,setState]=useState([]);

    // const handleChange=(e)=>{
       
    //     if(!state.includes(e.target.value)){
    //         setState([...state,e.target.value]);
    //     }
    //     else{
    //         let a=state.filter((elem)=>elem!==e.target.value);
    //         setState(a)
    //     }
    // }

    // console.log("line no 14",state);


    // return(
    //     <React.Fragment>
            
    //         <div className="flex-center">
    //         <input type="checkbox" value="1" onChange={handleChange} checked={state.includes("1")}/>
    //         <input type="checkbox" value="2" onChange={handleChange} checked={state.includes("2")}/>
    //         <input type="checkbox" value="3" onChange={handleChange} checked={state.includes("3")}/>
    //         <input type="checkbox" value="4"  onChange={handleChange} checked={state.includes("4")}/>
    //         </div>
    //     </React.Fragment>
    // )
    const[Value, setvalue]=useState([])

    const handlecheck=(e)=>{
    
        setvalue([...Value, e.target.value])
    }
    console.log(Value,"adhfhfh");
    console.log(Value+1)

    return(
        <React.Fragment>
            <input type="checkbox" value={'1'} onChange={handlecheck} checked={Value.includes("1")} />
            <input type="checkbox" value={'2'} onChange={handlecheck} checked={Value.includes("2")}/>
            <input type="checkbox" value={'3'} onChange={handlecheck} checked={Value.includes("3")}/>
            <input type="checkbox" value={'4'}  onChange={handlecheck} checked={Value.includes("4")}/>
        </React.Fragment>
    )
}

export default CheckBox;