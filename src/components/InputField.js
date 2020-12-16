import React from 'react'

/** 
* This is a helper-component that captures some of the functionality of a controlled component
* @param  value - The value of the input field
* @param  handleChange - Function that defines what to do with a change in value
* @return A controlled input-field
*/
const InputField = ({value, handleChange}) => {
    return <input type="text" value={value} onChange={handleChange}></input>;
  };

export default InputField