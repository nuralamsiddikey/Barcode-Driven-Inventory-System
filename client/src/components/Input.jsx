import React from "react";

export default function Input({label,handleChange}) {
  return <input 
    type="text" 
    placeholder={`${label?label:'Type here'}`} 
    className="input input-bordered w-full"
    onChange={(e)=>handleChange(e.target.value)} 
  />
}
