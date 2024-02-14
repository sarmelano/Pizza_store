import React from 'react'

const Input = (props) => {
  const { name, placeholder, value, onChange, onBlur, error } = props;

  return (
    <>
      <input type="text" name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} />
      {error && <p>{error}</p>}
    </>
  );
};

export default Input