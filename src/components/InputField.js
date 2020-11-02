import React from 'react'

const InputField = ({value, handleChange}) => {
    return <input type="text" value={value} onChange={handleChange}></input>;
  };

export default InputField